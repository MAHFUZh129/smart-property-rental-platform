"use server"

import { dbConnect } from "@/lib/dbConnect"
import { getCurrentUser } from "./auth";
import { redirect } from "next/navigation";

const rentalRequests = dbConnect('rentalRequests')
const reviews = dbConnect('reviews')


// get all reviews for single property
export const getAllReviews = async (propertyId) => {


    const allReviews = await reviews.find({ propertyId }).toArray()

    const totalReviews = allReviews.length

    const totalRating = allReviews.reduce((sum, review) => {

        return sum + review.rating
        
    }, 0
    )

    const averageRating = totalReviews === 0 ? 0 : totalRating / totalReviews

    return {
        allReviews,
        averageRating,
        totalReviews
    }



}


export const getTenantReviewStatus = async (propertyId, userEmail) => {

    const rental = await rentalRequests.findOne({
        tenantEmail: userEmail,
        propertyId,
        status: "approved",
    });

    const review = await reviews.findOne({
        tenantEmail: userEmail,
        propertyId
    })

    return {
        hasRented: Boolean(rental),
        alreadyReviewed: Boolean(review)

    }

}


export const submitReview = async (formData) => {

    const propertyId = formData.get('propertyId')
    const comment = formData.get('comment')
    const rating = Number(formData.get("rating"))

    const user = await getCurrentUser()
    if (!user) {

        redirect(`/api/auth/signin?callbackUrl=${propertyId}`)

    }

    if (!rating || rating < 1 || rating > 5 || comment.length < 10) {
        redirect(`/properties/${propertyId}?reviewError=missing-fields`)
    }

    // tenants whose rental request was approved can review
    const hasRented = await rentalRequests.findOne({
        propertyId,
        tenantEmail: user.email,
        status: "approved",
    });

    if (!hasRented) {
        redirect(`/properties/${propertyId}?reviewError=not-a-tenant`);
    }

    // one review per tenant per property
    const existingReview = await reviews.findOne({ propertyId, tenantEmail: user.email })

    if (existingReview) {
        redirect(`/properties/${propertyId}?reviewError=already-reviewed`);
    }

    // save in db

    const reviewDoc = {
        propertyId,
        tenantEmail: user.email,
        tenantName: user.name || "Rentora tenant",
        rating,
        comment,
        createdAt: new Date(),
    }

    const review = await reviews.insertOne(reviewDoc)

    redirect(`/properties/${propertyId}?reviewed=1`)


} 