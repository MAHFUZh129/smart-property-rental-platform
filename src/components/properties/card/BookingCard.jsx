import React from 'react';
import { CalendarDays, ShieldCheck } from 'lucide-react';
import RentalRequestButton from '../button/RentalRequestButton';

const BookingCard = ({property, isLoggedIn,hasRequested, status, requested}) => {

    const {createdAt , price, _id} = property

    const listedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

    return (
        <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-brand-900/5">
      <p>
        <span className="text-3xl font-bold text-brand-900">
          ৳{price.toLocaleString("en-US")}
        </span>
        <span className="text-slate-500"> / month</span>
      </p>
 

       <div className="mt-5">
        <RentalRequestButton requested={requested } status={status} hasRequested={hasRequested} propertyId={_id} isLoggedIn={isLoggedIn} />
      </div>
 
      <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-500">
        <p className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-emerald-600" />
          Listing verified by Rentora
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays className="size-4" />
          Listed on {listedDate}
        </p>
      </div>
    </div>
    );
};

export default BookingCard;