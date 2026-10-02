import { AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import ReviewForm from '../form/ReviewForm';

const ERROR_MESSAGES = {
    "missing-fields": "Please choose a star rating and write a short review.",
    "not-a-tenant": "Only tenants with an approved rental can review this property.",
    "already-reviewed": "You've already reviewed this property.",
};

const WriteReviewSection = ({propertyId, hasRented, reviewError, justReviewed, isLoggedIn, alreadyReviewed }) => {


    return (
        <div className="mt-6">
            {reviewError && ERROR_MESSAGES[reviewError] && (
                <p className="mb-3 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="size-4" />
                    {ERROR_MESSAGES[reviewError]}
                </p>
            )}

            {justReviewed && (
                <p className="mb-3 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    <CheckCircle2 className="size-4" />
                    Thanks! Your review has been posted.
                </p>
            )}

            {!isLoggedIn ? (
                <Link
                    href={`/api/auth/signin?callbackUrl=/properties/${propertyId}`}
                    className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 hover:border-brand-400 hover:text-brand-700"
                >
                    <Lock className="size-4" />
                    Login to write a review
                </Link>
            ) : !hasRented ? (
                <p className="rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-500">
                    You can review this property once your rental request is approved.
                </p>
            ) : alreadyReviewed ? (
                <p className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    <CheckCircle2 className="size-4 text-emerald-600" />
                    You've already reviewed this property. Thank you!
                </p>
            ) : (
                <ReviewForm propertyId={propertyId} />
            )}
        </div>
    );
};

export default WriteReviewSection;