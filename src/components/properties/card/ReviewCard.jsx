import { UserCircle } from 'lucide-react';
import React from 'react';
import RatingStars from '../details/RatingStars';

const ReviewCard = ({review}) => {
    
    const date = new Date(review.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <UserCircle className="size-8 text-slate-300" />
                    <div>
                        <p className="text-sm font-medium text-slate-900">{review.tenantName}</p>
                        <p className="text-xs text-slate-400">{date}</p>
                    </div>
                </div>
                <RatingStars rating={review.rating} size="size-3.5" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{review.comment}</p>
        </div>
    )
};

export default ReviewCard;