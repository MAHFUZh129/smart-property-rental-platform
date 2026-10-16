"use server"
import { dbConnect } from "@/lib/dbConnect"
import { getCurrentUser } from "./auth"
import { ObjectId } from "mongodb"

const leases = dbConnect('leases')
const users = dbConnect('users')
const properties = dbConnect('properties')

export const getCurrentTenants = async () => {

    const user = await getCurrentUser()

    if (!user || user.role !== "landlord") {
        return {
            success: false,
            message: "Unauthorized access.",
        };
    }

    const leasedProperties = await leases.find({ 'landlord.email': user?.email }).toArray()

    if (leasedProperties.length === 0) return []

    const tenantsEmails = leasedProperties.map(
        (l) => l.tenant.email
    );

    const propertyIDs = leasedProperties.map(
        (l) => l.property.propertyId
    )

    const [tenants, propertiesInLease] = await Promise.all([
        users.find({ email: { $in: tenantsEmails } }).toArray(),
        properties.find({ _id: { $in: propertyIDs.map((id)=> new ObjectId(id))} }).toArray(),
    ])

    const tenantMap = {}
    tenants.forEach((t) => {
        tenantMap[t.email] = {
            name: t.name || "Tenant",
            email: t.email || "",
            image: t.image || null,
        }

    })

    const propertyMap = {}
    propertiesInLease.forEach((p) => {
        propertyMap[p._id.toString()] = {
            _id: p._id.toString(),
            title: p.title,
            city: p.city,
            area: p.area,
        }

    })

   

    return leasedProperties.map((l) => ({
        _id: l._id.toString(),
        unit: l.unit,
        monthlyRent: l.monthlyRent,
        securityDeposit: l.securityDeposit,
        startDate: l.startDate?.toISOString(),
        endDate: l.endDate?.toISOString(),
        tenant: tenantMap[l.tenant.email] || { name: "Tenant", email: "", phone: "", image: null },
        property: propertyMap[l.property.propertyId] || null,
    }))

}
