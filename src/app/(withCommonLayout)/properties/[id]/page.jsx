import { getCurrentUser } from '@/actions/server/auth';
import { getPropertyById, getSimilarProperties } from '@/actions/server/properties';
import BookingCard from '@/components/properties/card/BookingCard';
import AvailabilityStatus from '@/components/properties/details/AvailabilityStatus';
import BackLink from '@/components/properties/details/BackLink';
import PropertyAmenities from '@/components/properties/details/PropertyAmenities';
import PropertyDescription from '@/components/properties/details/PropertyDescription';
import PropertyFacts from '@/components/properties/details/PropertyFacts';
import PropertyGallery from '@/components/properties/details/PropertyGallery';
import PropertyHeader from '@/components/properties/details/PropertyHeader';
import RequestSuccessBanner from '@/components/properties/card/RequestSuccessBanner';
import SimilarProperties from '@/components/properties/details/SimilarProperties';
import { notFound } from 'next/navigation';
import React from 'react';
import LandlordCard from '@/components/properties/card/LandlordCard';
import WriteReviewSection from '@/components/properties/details/WriteReviewSection';
import { getAllReviews, getTenantReviewStatus } from '@/actions/server/reviews';
import ReviewsList from '@/components/properties/details/ReviewsList';




export async function generateMetadata({ params }) {

    const { id } = await params

    const { data: property } = await getPropertyById(id)

    if (!property) {
        return { title: "Property not found " };
    }

    return {
        title: `${property.title}`,
        description: property.description,
    }

}

const PropertyDetails = async ({ params, searchParams }) => {

    //get params
    const { requested ,reviewError} = await searchParams
    const { id } = await params

    // get properties
    const { data: property } = await getPropertyById(id);

    if (!property) {
        return notFound()
    }
    const { data: similarProperties } = await getSimilarProperties(property)

    // get user
    const user = await getCurrentUser()

    const isLoggedIn = Boolean(user)


    // get reviews
    const { hasRented, alreadyReviewed ,reviewed} = await getTenantReviewStatus(id, user?.email)


    const {allReviews, totalReviews, averageRating} = await getAllReviews(id)

 
    return (
        <div>
            <main className="min-h-screen bg-slate-50 pb-20">
                <div className="mx-auto max-w-6xl px-4 pt-6">
                    <BackLink />

                    {requested === "1" && (
                        <div className="mt-4">
                            <RequestSuccessBanner />
                        </div>
                    )}

                    <div className="mt-4">
                        <PropertyGallery images={property.images} title={property.title} />
                    </div>

                    {/* main content */}
                    <div className="mt-8 grid gap-10 lg:grid-cols-3">
                        <div className="space-y-8 lg:col-span-2">
                            <PropertyHeader property={property} />
                            <AvailabilityStatus availableUnits={property.availableUnits} />
                            <PropertyFacts property={property} />
                            <PropertyDescription description={property.description} />
                            <PropertyAmenities amenities={property.amenities} />
                            <LandlordCard landlord={property.landlord} />

                            <WriteReviewSection
                                propertyId={property._id}
                                isLoggedIn={isLoggedIn}
                                hasRented={hasRented}
                                reviewError={reviewError}
                                alreadyReviewed={alreadyReviewed}
                                justReviewed={reviewed === "1"}
                            />
 
                            <ReviewsList
                                averageRating={averageRating}
                                totalReviews={totalReviews}
                                reviews={allReviews}
                            />  
                        </div>

                        <div>
                            <BookingCard requested={requested} property={property} isLoggedIn={isLoggedIn} />
                        </div>
                    </div>
                    <SimilarProperties properties={similarProperties} />
                </div>
            </main>
        </div>
    );
};

export default PropertyDetails;