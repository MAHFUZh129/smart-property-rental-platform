import Image from 'next/image';
import React from 'react';
import PropertyStatusBadge from './PropertyStatusBadge';
import { Bath, BedDouble, DoorOpen, ExternalLink, Info, MapPin, Pencil, Ruler,  } from 'lucide-react';
import Link from 'next/link';



const NOTES = {
    pending: "Waiting for an admin to review it. It will appear publicly once approved.",
    rejected: "This listing was rejected. Edit it and save to send it for review again.",
    inactive: "This listing is hidden from the public site.",
}

const LandlordPropertyCard = ({ property }) => {

    const { _id, title, propertyType: type, city, area, price, bedrooms, bathrooms, size, availableUnits, images, status } = property;

    const note = NOTES[status]

    return (

        <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="relative aspect-[16/10] bg-slate-100">
                {images?.[0] && (
                    // unoptimized: landlords paste links from any website
                    <Image src={images[0]} alt={title} fill unoptimized sizes="(min-width:1280px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                )}
                <div className="absolute left-3 top-3">
                    <PropertyStatusBadge status={status} />
                </div>
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700">{type}</span>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-1 text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin className="size-4 shrink-0" />
                    <span className="line-clamp-1">{area}, {city}</span>
                </p>

                <p className="mt-3 text-xl font-bold text-brand-700">
                    ৳{Number(price).toLocaleString()}
                    <span className="text-sm font-normal text-slate-500"> / month</span>
                </p>

                <div className="mt-4 grid grid-cols-4 gap-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
                    <span className="flex flex-col items-center gap-1"><BedDouble className="size-4 text-slate-400" />{bedrooms} bed</span>
                    <span className="flex flex-col items-center gap-1"><Bath className="size-4 text-slate-400" />{bathrooms} bath</span>
                    <span className="flex flex-col items-center gap-1"><Ruler className="size-4 text-slate-400" />{size} sqft</span>
                    <span className="flex flex-col items-center gap-1"><DoorOpen className="size-4 text-slate-400" />{availableUnits} left</span>
                </div>

                {note && (
                    <p className="mt-4 flex gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                        <Info className="mt-0.5 size-4 shrink-0 text-slate-400" />
                        {note}
                    </p>
                )}

                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    <Link
                        href={`/landlord/dashboard/properties/${_id}/edit`}
                        className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
                    >
                        <Pencil className="size-4 shrink-0" />
                        <span>Edit</span>
                    </Link>


                    {status === "approved" && (
                        <Link
                            href={`/properties/${_id}`}
                            className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            <ExternalLink className="size-4 shrink-0" />
                            <span className="truncate">View listing</span>
                        </Link>
                    )}
                </div>

            </div>
        </div>
    );
};

export default LandlordPropertyCard;