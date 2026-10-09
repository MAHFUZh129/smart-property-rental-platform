import { dbConnect } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"

const leases = dbConnect('leases')
const properties = dbConnect('properties')
const users = dbConnect('users')

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