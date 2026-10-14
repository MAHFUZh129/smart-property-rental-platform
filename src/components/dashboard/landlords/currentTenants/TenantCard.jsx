import { daysLeft, formatDate, initials, SOON_DAYS } from '@/lib/utils/dashboard/Lease-helpers';
import { Banknote, Building2, CalendarDays, DoorOpen, Mail, Phone, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Fact = ({ icon: Icon, label, value }) => {
    return (
        <div className="flex items-start gap-2.5">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon className="size-4" />
            </span>
            <div className="min-w-0">
                <p className="text-xs text-slate-500">{label}</p>
                <p className="truncate text-sm font-medium text-slate-900">{value}</p>
            </div>
        </div>
    );
}


const TenantCard = ({ lease }) => {

    const { tenant, property, unit, monthlyRent, securityDeposit, startDate, endDate } = lease;


    // How far through the lease we are, and how long is left
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const progress = Math.min(100, Math.max(0, Math.round(((Date.now() - start) / (end - start)) * 100)));
    const left = daysLeft(endDate);
    const soon = left <= SOON_DAYS;

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
            {/* Image */}
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
              
                <Image
                 src={tenant.image}
                 alt='Tenant Image'
                width={34}
                height={34}
                
                   className="rounded-full size-12"
                 />

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-lg font-semibold text-slate-900">{tenant.name}</h3>
                        <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${soon ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
                                }`}
                        >
                            {left <= 0 ? "Lease ending" : soon ? `Ends in ${left} days` : "Active"}
                        </span>
                    </div>
                    <div className="mt-1.5 flex flex-col gap-1 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:gap-x-5">
                        {tenant.email && (
                            <span className="flex min-w-0 items-center gap-1.5">
                                <Mail className="size-4 shrink-0" />
                                <span className="truncate">{tenant.email}</span>
                            </span>
                        )}
                        {tenant.phone && (
                            <span className="flex items-center gap-1.5">
                                <Phone className="size-4 shrink-0" /> {tenant.phone}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* What they rent */}
            <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
                <Fact
                    icon={Building2}
                    label="Property"
                    value={property ? `${property.title}` : "Property removed"}
                />
                <Fact icon={DoorOpen} label="Unit" value={unit} />
                <Fact icon={Banknote} label="Monthly rent" value={`৳${Number(monthlyRent).toLocaleString()}`} />
                <Fact icon={ShieldCheck} label="Security deposit" value={`৳${Number(securityDeposit).toLocaleString()}`} />
            </div>

            {/* Lease progress */}
            <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                        <CalendarDays className="size-4" /> {formatDate(startDate)} – {formatDate(endDate)}
                    </span>
                    {property && (
                        <Link href={`/properties/${property._id}`} className="font-medium text-brand-700 hover:underline">
                            View property
                        </Link>
                    )}
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                        className={`h-full rounded-full ${soon ? "bg-amber-500" : "bg-brand-600"}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="mt-1.5 text-xs text-slate-500">
                    {progress}% of the lease completed · {Math.max(left, 0)} days left
                </p>
            </div>
        </div>
    );
};

export default TenantCard;