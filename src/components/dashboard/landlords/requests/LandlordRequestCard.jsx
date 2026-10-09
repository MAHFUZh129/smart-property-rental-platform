import { Banknote, Building2, CalendarDays, CheckCircle2, Info, Mail, MapPin, Phone, XCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import RequestStatusBadge from '../../Sharedui/RequestStatusBadge';
import Link from 'next/link';
import RequestActions from './RequestActions';

const LandlordRequestCard = ({ request }) => {

    const { _id, status, createdAt, property, tenant } = request;
    const isPending = status === "pending";

    const date = new Date(createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });


    return (

        <div
            className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${isPending ? "border-amber-200 border-l-4 border-l-amber-400" : "border-slate-200"
                }`}
        >
            <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-5">
                {/* Property (left, 3 of 5 columns on large screens) */}
                <div className="flex gap-4 lg:col-span-3">
                    <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-24 sm:w-32">
                        {property.image ? (
                            <Image
                                src={property.image}
                                alt={property.title}
                                fill
                                sizes="128px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-slate-300">
                                <Building2 className="size-6" />
                            </div>
                        )}
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <RequestStatusBadge status={status} />
                            <span className="text-xs text-slate-400">## {_id}</span>
                        </div>

                        <Link
                            href={`/properties/${property._id}`}
                            className="mt-1.5 block truncate font-semibold text-slate-900 hover:text-brand-700"
                        >
                            {property.title}
                        </Link>

                        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                            <MapPin className="size-3.5 shrink-0" />
                            <span className="truncate">
                                {property.area}, {property.city}
                            </span>
                        </p>

                        <p className="mt-1.5 flex items-center gap-1 text-sm font-semibold text-brand-900">
                            <Banknote className="size-4 text-brand-500" />
                            ৳{property.price.toLocaleString("en-US")}
                            <span className="text-xs font-normal text-slate-500">/ month</span>
                        </p>
                    </div>
                </div>

                {/* Tenant */}
                <div className="rounded-xl bg-slate-50 p-4 lg:col-span-2">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Requested by
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                            {tenant.name.charAt(0).toUpperCase()}
                        </span>
                        <p className="truncate font-medium text-slate-900">{tenant.name}</p>
                    </div>

                    <div className="mt-3 space-y-1.5 text-sm">
                        {tenant.email && (
                            <a
                                href={`mailto:${tenant.email}`}
                                className="flex items-center gap-2 text-slate-600 hover:text-brand-700"
                            >
                                <Mail className="size-4 shrink-0 text-slate-400" />
                                <span className="truncate">{tenant.email}</span>
                            </a>
                        )}
                        {tenant.phone && (
                            <a
                                href={`tel:${tenant.phone}`}
                                className="flex items-center gap-2 text-slate-600 hover:text-brand-700"
                            >
                                <Phone className="size-4 shrink-0 text-slate-400" />
                                {tenant.phone}
                            </a>
                        )}
                        {!tenant.email && !tenant.phone && (
                            <p className="flex items-center gap-2 text-slate-400">
                                <Info className="size-4" />
                                No contact details on file
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* date on the left, actions on the right */}
            <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <p className="flex items-center gap-1.5 text-xs text-slate-500">
                    <CalendarDays className="size-3.5" />
                    Requested on {date}
                </p>
                {isPending ? (
                    <RequestActions requestId={_id} />
                ) : (
                    <div
                        className={`flex items-start gap-3 rounded-xl border p-3.5 ${status === "approved"
                                ? "border-emerald-200 bg-emerald-50/70"
                                : "border-rose-200 bg-rose-50/70"
                            }`}
                    >
                        <div
                            className={`flex size-9 shrink-0 items-center justify-center rounded-full ${status === "approved"
                                    ? "bg-emerald-100 text-emerald-600"
                                    : "bg-rose-100 text-rose-600"
                                }`}
                        >
                            {status === "approved" ? (
                                <CheckCircle2 className="size-5" />
                            ) : (
                                <XCircle className="size-5" />
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p
                                className={`text-sm font-semibold ${status === "approved"
                                        ? "text-emerald-800"
                                        : "text-rose-800"
                                    }`}
                            >
                                {status === "approved"
                                    ? "Request Approved"
                                    : "Request Declined"}
                            </p>

                            <p
                                className={`mt-1 text-xs leading-5 ${status === "approved"
                                        ? "text-emerald-700"
                                        : "text-rose-700"
                                    }`}
                            >
                                {status === "approved"
                                    ? "The lease has been created successfully."
                                    : "This rental request has been declined."}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandlordRequestCard;