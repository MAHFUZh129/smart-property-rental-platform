import { MessageSquare } from 'lucide-react';
import React from 'react';
import RatingStars from './RatingStars';
import ReviewCard from '../card/ReviewCard';

const ReviewsList = ({ reviews, totalReviews,averageRating }) => {

    return (
        <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <MessageSquare className="size-5 text-brand-600" />
                Ratings & reviews
            </h2>

            <div className="mt-2 flex items-center gap-2">
                <RatingStars rating={averageRating} />
                <span className="text-sm font-semibold text-slate-900">
                    {averageRating.toFixed(1)}
                </span>
                <span className="text-sm text-slate-500">
                    ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
                </span>
            </div>

            {totalReviews === 0 ? (
                <p className="mt-4 text-sm text-slate-500">
                    No reviews yet. Be the first to review this property.
                </p>
            ) : (
                <div className="mt-4 space-y-3">
                    {reviews.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewsList;