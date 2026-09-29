'use server'
import { dbConnect } from "@/lib/dbConnect"


const properties = dbConnect('properties')

export const getProperties = async (filters = {}) => {

   const query = { status: "approved" };

   if (filters.type) {
      query.propertyType = filters.type
   }

   if (filters.city) {
      query.city = filters.city
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

         { description: { $regex: filters.search ,$options: 'i' } }
      ]
   }

   //  pagination
   const page = Math.max(Number(filters.page) || 1, 1)

   const results = await properties.find(query).sort({ createdat: -1 }).limit(9).skip((page - 1) * 9).toArray()

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




