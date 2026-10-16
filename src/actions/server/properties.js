"use server"
import { dbConnect } from "@/lib/dbConnect"
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { getCurrentUser } from "./auth";
import { AMENITY_OPTIONS, CITIES, PROPERTY_TYPES } from "@/data/dashboard/landlord-Constants";
import { revalidatePath } from "next/cache";
import { notifyAdmins } from "./notifications";



const properties = dbConnect('properties')
const users = dbConnect('users')

//func:1 for all properties
export const getProperties = async (filters = {}) => {

   const query = { status: "approved" };

   if (filters.type) {
      query.propertyType = filters.type
   }

   let sortOption = { createdAt: -1 };

   if (filters.sort) {

      if (filters.sort === "price-asc") {
         sortOption = { price: 1 };
      }

      if (filters.sort === "price-desc") {
         sortOption = { price: -1 };
      }

      if (filters.sort === "rating") {
         sortOption = { rating: -1 };
      }

   }

   if (filters.city) {
      // query.city = filters.city
      query.$or = [
         { city: { $regex: filters.city, $options: 'i' } }
      ]
   }
   if (filters.bedrooms) {
      query.bedrooms = { $gte: Number(filters.bedrooms) }
   }
   if (filters.maxPrice) {
      query.price = { $lte: Number(filters.maxPrice) }
   }
   if (filters.search) {
      query.$or = [
         { title: { $regex: filters.search, $options: 'i' } },

         { description: { $regex: filters.search, $options: 'i' } }
      ]
   }

   //  pagination
   const page = Math.max(Number(filters.page) || 1, 1)

   const results = await properties.find(query).sort(sortOption).limit(9).skip((page - 1) * 9).toArray()

   const totalProperties = await properties.countDocuments(query)

   const data = results.map(result => ({
      ...result,
      _id: result._id.toString(),
      // createdAt: result.createdAt.toISOString()
   }))

   return {
      success: true,
      message: 'get all data successfully',
      page,
      data,
      totalProperties
   }
}


// func:2 similar Properties
export const getSimilarProperties = async (property) => {

   const { status, propertyType, city, _id } = property

   const id = { $ne: new ObjectId(_id) }

   const query = { status, propertyType, city, _id: id }

   const results = await properties.find(query).toArray()

   const data = results.map(result => (
      {
         ...result,
         _id: result._id.toString()

      }
   ))

   return {
      data
   }

}



//func:3 for details
export const getPropertyById = async (id) => {

   const result = await properties.findOne({ _id: new ObjectId(id) })

   if (!result) {
      return { result: null }
   }

   return {
      data: {
         ...result,
         _id: result._id.toString()
      }

   }
}


// Landlords' actions
//func:1 Landlord all Properties
export const getLandlordProperties = async () => {

   const user = await getCurrentUser();

   if (!user || user.role !== "landlord") {
      redirect("/api/auth/signin?callbackUrl=/tenant/dashboard");
   }

   const LandlordEmail = user?.email

   const landlodProperties = await properties.find({ 'landlord.email': LandlordEmail }).toArray()

   return landlodProperties

}

// Adding landlords property 

// here are some functions to save new property in db
// 1. raw form into plain trimmed strings
const readForm = (formData) => {
   const text = (name) => {
      return formData.get(name)?.toString().trim() ?? ""
   }

   return {
      title: text("title"),
      propertyType: text("propertyType"),
      description: text("description"),
      address: text("address"),
      city: text("city"),
      area: text("area"),
      price: text("price"),
      bedrooms: text("bedrooms"),
      bathrooms: text("bathrooms"),
      size: text("size"),
      availableUnits: text("availableUnits"),
      amenities: formData.getAll("amenities").map(String),
      images: formData.get("images")?.toString() ?? "",
   };
}


//2.validate funtion returns { errors, data }. if errors is empty, data is ready to save.
const validate = (values) => {

   const isWhole = (text) => {
      return text !== "" && Number.isInteger(Number(text)) && Number(text) >= 0;
   }


   const errors = {}

   if (values.title.length < 5) {
      errors.title = "Enter a title with at least 5 characters."
   }

   if (!PROPERTY_TYPES.includes(values.propertyType)) {
      errors.propertyType = "Choose a property type."
   }

   if (values.description.length < 20) {
      errors.description = "Write at least 20 characters so tenants know what to expect."
   }

   if (!values.address) {
      errors.address = "Enter the street address."
   }

   if (!CITIES.includes(values.city)) {
      errors.city = "Choose a city."
   }

   if (!values.area) {
      errors.area = "Enter the area or neighbourhood."
   }

   if (!(Number(values.price) > 0)) {
      errors.price = "Enter the monthly rent as a number above 0."
   }

   if (!isWhole(values.bedrooms)) {
      errors.bedrooms = "Enter a whole number. Use 0 if there are none."
   }

   if (!isWhole(values.bathrooms)) {
      errors.bathrooms = "Enter a whole number. Use 0 if there are none."
   }

   if (!(Number(values.size) > 0)) {
      errors.size = "Enter the size in square feet."
   }

   if (!isWhole(values.availableUnits)) {
      errors.availableUnits = "Enter a whole number of units."
   }

   const images = Array.isArray(values.images) ? values.images : (values.images || "").split(/\r?\n/).filter(Boolean)

   const cleanImgs = images.map((url) => url.trim()).filter(Boolean)
   const validImages = cleanImgs.filter((url) => /^https?:\/\/\S+$/i.test(url))


   if (cleanImgs.length === 0) {
      errors.images = "Upload at least 1 property image.";
   }
   else if (cleanImgs.length === 0 || cleanImgs.some((url) => !/^https?:\/\/\S+$/i.test(url))) {
      errors.images = "Provide at least 1 valid image URL.";
   }


   const data = {
      title: values.title,
      propertyType: values.propertyType,
      description: values.description,
      address: values.address,
      city: values.city,
      area: values.area,
      price: Number(values.price),
      bedrooms: Number(values.bedrooms),
      bathrooms: Number(values.bathrooms),
      size: Number(values.size),
      sizeUnit: "sqft",
      availableUnits: Number(values.availableUnits),
      amenities: values.amenities.filter((item) => AMENITY_OPTIONS.includes(item)),
      images: validImages,
   };

   return { errors, data };
}

// func:2 Adding landlords property 
export const createProperty = async (_prevState, formData) => {

   const user = await getCurrentUser()
   if (!user) redirect("/api/auth/signin?callbackUrl=/landlord/dashboard/properties/new")

   const values = readForm(formData);


   if (user.role !== "landlord") {
      return { errors: {}, values, message: "Only landlord accounts can add properties." };
   }

   const { errors, data } = validate(values)

   if (Object.keys(errors).length > 0) {
      return { errors, values, message: "Please fix the highlighted fields." };
   }

   // saving new property in db
   const landlord = await users.findOne({ email: user?.email })

   const propertyInfo = {
      ...data,
      landlord: {
         name: landlord.name,
         email: landlord.email,
         memberSince: landlord.memberSince,
      },
      status: 'pending',
      createdAt: new Date()
   }

   const result = await properties.insertOne(propertyInfo)


   // sent notifications to all admins
   await notifyAdmins({
      type: "property",
      title: "New property to review",
      message: `A new property, "${data.title}", has been submitted by ${user.name || "a landlord"} and is awaiting your approval.`,
      link: "/admin/dashboard/properties",
   });

   revalidatePath('/landlord/dashboard/properties')
   // redirect("/landlord/dashboard/properties?saved=created")

   return {
      success: true,
      insertedId: result.insertedId.toString(),

   }

}


// func:3 getting single property by id
export const getLandlordPropertyById = async (id) => {

   const user = await getCurrentUser()

   if (!user) {
      return null
   }

   const propertyID = new ObjectId(id)

   const property = await properties.findOne({
      _id: propertyID,
      'landlord.email': user.email
   })

   return {
      ...property,
      _id: property?._id.toString()
   }
}

//func:4 updating the property in db
export const updateProperty = async (_prevState, formData) => {

   const user = await getCurrentUser();
   if (!user) redirect("/api/auth/signin?callbackUrl=/landlord/dashboard/properties");

   const propertyId = formData.get("propertyId")?.toString()
   const values = readForm(formData)

   if (user.role !== "landlord" || !ObjectId.isValid(propertyId)) {
      return { errors: {}, values, message: "You can't edit this property." };
   }

   const { errors, data } = validate(values);
   if (Object.keys(errors).length > 0) {
      return { errors, values, message: "Please fix the highlighted fields." };
   }

   //  nobody can edit another landlord's listing
   const existing = await properties.findOne({
      _id: new ObjectId(propertyId),
      'landlord.email': user?.email,
   });

   if (!existing) {
      return { errors: {}, values, message: "We couldn't find this property in your account." };
   }


   const changes = { ...data, updatedAt: new Date() };

   // A rejected listing goes back to review once the landlord has fixed it
   if (existing.status === "rejected") {
      changes.status = "pending"
   }


   const result = await properties.updateOne({ _id: existing._id }, { $set: changes })

   //  A rejected listing was fixed and is waiting for review again


   revalidatePath("/landlord/dashboard/properties");

   return {
      success: true,
      insertedId: existing._id.toString(),

   }


}


// func:5. deleting landlords property
export const deleteProperty = async (propertyId) => {

   // 1. checking logged-in user
   const user = await getCurrentUser();

   if (!user || user.role !== "landlord") {
      return {
         success: false,
         message: "Unauthorized access.",
      };
   }

   // 2. Validate property ID
   if (!ObjectId.isValid(propertyId)) {
      return {
         success: false,
         message: "Invalid property ID.",
      };
   }

   // 3. Delete only this landlord's property
   const result = await properties.deleteOne({
      _id: new ObjectId(propertyId),
      "landlord.email": user.email,
   });

   if (result.deletedCount === 0) {
      return {
         success: false,
         message: "Property not found or you cannot delete it.",
      };
   }

   // 4. Refresh property listings
   revalidatePath("/landlord/dashboard/properties");
   return {
      success: true,
      message: "Property deleted successfully.",
   };

}
