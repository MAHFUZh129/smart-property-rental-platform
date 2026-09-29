import React from 'react';
import { CalendarDays, Phone, ShieldCheck } from 'lucide-react';

const BookingCard = ({property}) => {

    const {createdAt , price} = property

    const listedDate = new Date(createdAt.$date).toLocaleDateString("en-GB", {
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
 
      <button
        type="button"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-200"
      >
        <Phone className="size-4" />
        Contact landlord
      </button>
 
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