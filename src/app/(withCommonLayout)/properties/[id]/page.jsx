import { getPropertyById, getSimilarProperties } from '@/actions/server/properties';
import BookingCard from '@/components/properties/card/BookingCard';
import BackLink from '@/components/properties/details/BackLink';
import PropertyAmenities from '@/components/properties/details/PropertyAmenities';
import PropertyDescription from '@/components/properties/details/PropertyDescription';
import PropertyFacts from '@/components/properties/details/PropertyFacts';
import PropertyGallery from '@/components/properties/details/PropertyGallery';
import PropertyHeader from '@/components/properties/details/PropertyHeader';
import SimilarProperties from '@/components/properties/details/SimilarProperties';
import { notFound } from 'next/navigation';
import React from 'react';




export async function generateMetadata({ params }) {

    const { id } = await params

    const { result: property } = await getPropertyById(id)

    if (!property) {
        return { title: "Property not found " };
    }

    return {
        title: `${property.title}`,
        description: property.description,
    }

}

const PropertyDetails = async ({ params }) => {

    const { id } = await params

    const { result: property } = await getPropertyById(id);

    if (!property) {
        return notFound
    }

    const { data: similarProperties } = await getSimilarProperties(property)


    return (
        <div>
            <main className="min-h-screen bg-slate-50 pb-20">
                <div className="mx-auto max-w-6xl px-4 pt-6">
                    <BackLink />

                    <div className="mt-4">
                        <PropertyGallery images={property.images} title={property.title} />
                    </div>

                    {/* sidebar */}
                    <div className="mt-8 grid gap-10 lg:grid-cols-3">
                        <div className="space-y-8 lg:col-span-2">
                            <PropertyHeader property={property} />
                            <PropertyFacts property={property} />
                            <PropertyDescription description={property.description} />
                            <PropertyAmenities amenities={property.amenities} />
                        </div>

                        <div>
                            <BookingCard property={property} />
                        </div>
                    </div>
                    <SimilarProperties properties={similarProperties} />
                </div>
            </main>
        </div>
    );
};

export default PropertyDetails;