import React from 'react';
import StarRatingInput from './StarRatingInput';
import { submitReview } from '@/actions/server/reviews';

const ReviewForm = ({propertyId}) => {
  return (
    <div>
      <form
        action={submitReview}
        className="rounded-xl border border-slate-200 bg-white p-4"
      >
        <input type="hidden" name="propertyId" value={propertyId} />

        <label className="text-sm font-medium text-slate-700">Your rating</label>
        <div className="mt-1.5">
          <StarRatingInput name={"rating"} />
        </div>

        <label htmlFor="comment" className="mt-4 block text-sm font-medium text-slate-700">
         Write Your feedback
        </label>
        <textarea
          id="comment"
          name="comment"
          required
          minLength={10}
          rows={3}
          placeholder="Share what it was like living here..."
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-100"
        />

        <button
          type="submit"
          className="mt-4 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-200"
        >
          Submit review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;