"use server"
import { dbConnect } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"

const leases = dbConnect('leases')
const properties = dbConnect('properties')
const users = dbConnect('users')


//func:1 get leases from data
export const getMyLeases = async (userEmail) => {

    const myLeases = await leases.find({ "tenant.email": userEmail }).sort({ createdAt: - 1 }).toArray()

    if (myLeases.length === 0) return []

    const propertyIds = myLeases.map((L) => new ObjectId(L.property.propertyId))


    const lanlordEmails = myLeases.map((l) => l.landlord.email)

    const [leasedProperties, landlords] = await Promise.all([
        properties.find({ _id: { $in: propertyIds } }).toArray(),
        users.find({ email: { $in: lanlordEmails } }).toArray()
    ])




    const propertyMap = {}

    leasedProperties.forEach((p) => {
        propertyMap[p._id.toString()] = {
            _id: p._id.toString(),
            title: p.title,
            image: p.images?.[0] || null,
            city: p.city,
            area: p.area,
        };
    });


    const landlordMap = {}

    landlords.forEach((u) => {
        landlordMap[u.email] = u.name || u.email || "Landlord";
    });


    return myLeases.map((l) => ({
        _id: l._id.toString(),
        unit: l.unit,
        monthlyRent: l.monthlyRent,
        securityDeposit: l.securityDeposit,
        startDate: l.startDate?.toISOString(),
        endDate: l.endDate?.toISOString(),
        status: l.leaseStatus,
        property: propertyMap[l.property.propertyId] || null,
        landlordName: landlordMap[l.landlord.email] || "Landlord",
    }));

}

//func:2 save leases in db
export const createLeaseFromRequest = async (request, property) => {
    
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1)

    // create leases collection
    const leaseInfo = {
        requestId: request._id.toString(),
        tenant: {
            name: request.tenantName,
            email: request.tenantEmail,
        },
        landlord: {
            name: request.landlordName,
            email: request.landlordEmail,
        },
        property:{
            title:property.title,
            propertyId:property._id.toString()
        },
        unit: 1,
        monthlyRent:property.price,
        securityDeposit: (property.price) * 3, 
        startDate,
        endDate,
        leaseStatus: "active",
        createdAt: new Date(),
    }

    const result = await leases.insertOne(leaseInfo)

    // update available units in properties collection
    const query = {_id:property._id}

    const updatedDoc={
        $set:{
            availableUnits: property.availableUnits - 1
        }
    }

   const updatedUnit = await properties.updateOne(query,updatedDoc)
   

}