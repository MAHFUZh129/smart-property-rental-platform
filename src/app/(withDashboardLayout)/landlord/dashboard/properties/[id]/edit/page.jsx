import React from 'react';
import { getLandlordPropertyById, updateProperty } from '@/actions/server/properties';
import BackToProperties from '@/components/dashboard/landlords/properties/newProperty/BackToProperties';
import PropertyForm from '@/components/dashboard/landlords/properties/newProperty/PropertyForm';
import PropertyStatusBadge from '@/components/dashboard/landlords/properties/PropertyStatusBadge';
import PageHeader from '@/components/dashboard/Sharedui/PageHeader';
import { toFormValues } from '@/data/dashboard/PropertyForm';

export const metadata = {
    title: "Edit Property | Rentora Dashboard",
    description:
        "Update your property details, pricing, amenities, and photos from your Rentora landlord dashboard.",
    robots: {
        index: false,
        follow: false,
    },
};


const EditProperty = async ({ params }) => {

    const { id } = await params

    const property = await getLandlordPropertyById(id)
    if (!property) notFound()

    return (
        <div>
            <BackToProperties />
            <PageHeader title="Edit property" subtitle={property.title}>
                <PropertyStatusBadge status={property.status} />
            </PageHeader>
            <PropertyForm
                action={updateProperty}
                initialValues={toFormValues(property)}
                propertyId={property._id}
                submitLabel="Save changes"
                cancelHref="/landlord/dashboard/properties"
                note={
                    property.status === "rejected"
                        ? "This listing was rejected. Saving your changes will send it for review again."
                        : "Changes to an approved listing show on the public site straight away."
                }
            />
        </div>
    );
};

export default EditProperty;