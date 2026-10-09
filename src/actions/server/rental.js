"use server"

import { dbConnect } from "@/lib/dbConnect"
import { getCurrentUser } from "./auth"
import { ObjectId } from "mongodb"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { revalidatePath } from "next/cache"


const rentalRequests = dbConnect('rentalRequests')
const properties = dbConnect('properties')

// For tenants
// get from db
export const getRentalRequests = async (userEmail) => {

    const requests = await rentalRequests.find({ tenantEmail: userEmail }).sort({ createdAt: -1 }).toArray()

    if (requests.length === 0) {
        return []
    }

    const propertyIds = requests.map((r) => new ObjectId(r.propertyId))

    const reqProperties = await properties.find({ _id: { $in: propertyIds } }).toArray()

    const propertyMap = {}

    reqProperties.forEach((p) => {
        propertyMap[p._id.toString()] = {
            _id: p._id.toString(),
            title: p.title,
            image: p.images[0],
            price: p.price,
            city: p.city,
            area: p.area,

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

    // checking in db if already requested
    const existingRequest = await rentalRequests.findOne({ tenantEmail: user.email, propertyId })


    if (existingRequest) {
        redirect(`/properties/${propertyId}?requested=1`)
    }


    // finally save in db   
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


// check if tenant already requested this property
export const hasRequestedProperty = async (propertyId, tenantEmail) => {

    const existingRequest = await rentalRequests.findOne({
        tenantEmail,
        propertyId,
    });

    return {
        status: existingRequest?.status,
        hasRequested: Boolean(existingRequest),
    };
};

// For landlords
export const getLandlordRentalRequests = async (landlordEmail) => {

    // 1. Find the requests made for those properties
    const requests = await rentalRequests.find({ landlordEmail }).toArray()
    if (requests.length === 0) return []

    // 2. Find this landlord's properties requsted
    const propertyIds = requests.map((r) => new ObjectId(r.propertyId))

    const reqProperties = await properties.find({ _id: { $in: propertyIds } }).toArray()

    const propertyMap = {}

    reqProperties.forEach((p) => {
        propertyMap[p._id.toString()] = {
            _id: p._id.toString(),
            title: p.title,
            image: p.images?.[0] || null,
            price: p.price,
            city: p.city,
            area: p.area,
            availableUnits: p.availableUnits,
        }
    })

    // 3. Look up each tenant
    // const tenantEmails = requests.map((r) => r.tenantEmail)

    const tenantMap = {}

    requests.forEach((r) => {
        tenantMap[r.tenantEmail] = {
            name: r.tenantName || "Tenant",
            email: r.tenantEmail || null,
            phone: r.phone || null,
        }

    })

    return requests.map((r) => ({
        _id: r._id.toString(),
        status: r.status,
        createdAt: r.createdAt?.toISOString(),
        property: propertyMap[r.propertyId],
        tenant: tenantMap[r.tenantEmail]
    }))

}

// update Rental Request Status
export const updateRentalRequestStatus = async (formData) => {

    // 1. Get form data
    const requestId = formData.get("requestId")?.toString();
    const newStatus = formData.get("status")?.toString();

    

    // 2. Validate input
    if (!requestId || !ObjectId.isValid(requestId)) {
        return {
            success: false,
            message: "Invalid request ID.",
        };
    }


    if (!["approved", "rejected"].includes(newStatus)) {
        return {
            success: false,
            message: "Invalid status.",
        };
    }

    // 3. Check logged-in user
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return {
            success: false,
            message: "Please login first.",
        };
    }


    // 4. Only landlord can update
    if (session.user.role !== "landlord") {
        return {
            success: false,
            message: "Only landlords can manage rental requests.",
        };
    }

    // 5. Find rental request
    const request = await rentalRequests.findOne({
        _id: new ObjectId(requestId),
    });


    if (!request) {
        return {
            success: false,
            message: "Rental request not found.",
        };
    }

    // 6. Check property ownership
    if (!ObjectId.isValid(request.propertyId)) {
        return {
            success: false,
            message: "Invalid property reference.",
        };
    }

    const reqProperty = await properties.findOne({
        _id: new ObjectId(request.propertyId),
        'landlord.email': session.user.email,
    });
    

    if (!reqProperty) {
        return {
            success: false,
            message: "You cannot manage this request.",
        };
    }

    // 7. Update only pending requests
    const result = await rentalRequests.updateOne(
        {
            _id: new ObjectId(requestId),
            status: "pending",
        },
        {
            $set: {
                status: newStatus,
                updatedAt: new Date(),
            },
        }
    );


    if (result.modifiedCount === 0) {
        return {
            success: false,
            message: "This request has already been processed.",
        };
    }

    // 8. Refresh landlord requests page
    revalidatePath("/landlord/dashboard/rental-requests");

    return {
        success: true,
        message: `Rental request ${newStatus} successfully.`,
    }



}