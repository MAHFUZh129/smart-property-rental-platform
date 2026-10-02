"use server"

import { dbConnect } from "@/lib/dbConnect"
import { getCurrentUser } from "./auth"
import { ObjectId } from "mongodb"
import { redirect } from "next/navigation"


const rentalRequests = dbConnect('rentalRequests')
const properties = dbConnect('properties')

export const requestRental = async (formData) => {

    const propertyId = formData.get('propertyId')

   
    const user = await getCurrentUser()


    if (!user) {
        redirect(`/login?callbackUrl=/properties/${propertyId}`);
    }

    const property = await properties.findOne({ _id: new ObjectId(propertyId) })

   
    const doc = {
        propertyId:propertyId,
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

