"use server"

import { dbConnect } from "@/lib/dbConnect"
import { getCurrentUser } from "./auth"
import { ObjectId } from "mongodb"
import { redirect } from "next/navigation"


const rentalRequests = dbConnect('rentalRequests')
const properties = dbConnect('properties')


// get from db
export const getRentalRequests = async (userEmail) => {

    const requests = await rentalRequests.find({ tenantEmail: userEmail }).sort({ createdAt: -1 }).toArray()

    if (requests.length === 0) {
        return []
    }

    const propertyIds = requests.map((r) => new ObjectId(r.propertyId))

    const reqProperties = await properties.find({ _id: { $in: propertyIds } }).toArray()

    const propertyMap ={}

    reqProperties.forEach((p)=>{
        propertyMap[p._id.toString()]={
            _id:p._id.toString(),
            title:p.title,
            image:p.images[0],
            price:p.price,
            city:p.city,
            area:p.area,

        }
    })

    return requests.map((r) => ({
        _id: r._id.toString(),
        status: r.status,
        createdAt: r.createdAt?.toISOString(),
        property: propertyMap[r.propertyId] || null,
    }));




}



// save in db
export const requestRental = async (formData) => {

    const propertyId = formData.get('propertyId')


    const user = await getCurrentUser()

    if (!user) {
        redirect(`/api/auth/signin?callbackUrl=/properties/${propertyId}`);
    }

    const property = await properties.findOne({ _id: new ObjectId(propertyId) })


    const doc = {
        propertyId: propertyId,

        propertyName: property.title,
        landlordName: property.landlord.name,
        landlordEmail: property.landlord.email,
        tenantName: user.name,
        tenantEmail: user.email,
        status: "pending",
        createdAt: new Date(),

    }


    const result = await rentalRequests.insertOne(doc)

    redirect(`/properties/${propertyId}?requested=1`);

}


