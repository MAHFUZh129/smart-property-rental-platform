'use server'
import { dbConnect } from "@/lib/dbConnect"


const properties = await dbConnect('properties')

export const getProperties = async()=>{

    const results = await properties.find().toArray()

    const data = results.map(result =>({
        ...result,
        _id:result._id.toString()
    }))

    return {
        success:true,
        message:'get all data successfully',
        data
    }

}