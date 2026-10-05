import { Building2, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import RequestStatusBadge from './RequestStatusBadge';

const RequestCard = ({request}) => {

  const {property, status, createdAt}= request

  
  const date = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

    return (
         <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      {/* thumbnail */}
      <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-20 sm:w-28">
        {property?.image ? (
          <Image
            src={property.image}
            alt={property.title}
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-300">
            <Building2 className="size-6" />
          </div>
        )}
      </div>
 
      {/* details */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={property ? `/properties/${property._id}` : "#"}
            className="truncate font-semibold text-slate-900 hover:text-brand-700"
          >
            {property?.title || "Property no longer available"}
          </Link>
          <RequestStatusBadge status={status} />
        </div>
 
        {property && (
          <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="size-3.5" />
            {property.area}, {property.city}
          </p>
        )}
 
        <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
          <Calendar className="size-3.5" />
          Requested on {date}
        </p>
      </div>
 
      {/* Price */}
      <div className="shrink-0">
        {property && (
          <p className="text-lg font-bold text-brand-900">
            ৳{property.price.toLocaleString("en-US")}
            <span className="text-xs font-normal text-slate-500"> /mo</span>
          </p>
        )}
      </div>
    </div>
    );
};

export default RequestCard;