'use server'
import { dbConnect } from "@/lib/dbConnect"
import { ObjectId } from "mongodb";


const properties = dbConnect('properties')

// for all properties
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


// similar Properties
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



// for details
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



