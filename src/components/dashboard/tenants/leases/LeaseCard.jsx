import { Banknote, Building2, CalendarDays, CalendarX, DoorOpen, ShieldCheck, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LeaseStatusBadge from './LeaseStatusBadge';


const InfoItem = ({ icon: Icon, label, value }) => {
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

const formatDate = (iso) => {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}


const LeaseCard = ({ lease }) => {

  const { property, landlordName, unit, monthlyRent, securityDeposit, startDate, endDate, status } = lease

  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  const now = Date.now()

  const progress = Math.min(
    100,
    Math.max(0, Math.round(((now - start) / (end - start)) * 100))
  )

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header: photo + title + status */}
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:gap-4">
        <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-16 sm:w-24">
          {property?.image ? (
            <Image
              src={property.image}
              alt={property.title}
              fill
              sizes="96px"
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
            <Link
              href={property ? `/properties/${property._id}` : "#"}
              className="truncate font-semibold text-slate-900 hover:text-brand-700"
            >
              {property?.title || "Property unavailable"}
            </Link>
            <LeaseStatusBadge status={status} />
          </div>
          {property && (
            <p className="mt-1 text-sm text-slate-500">
              {property.area}, {property.city}
            </p>
          )}
        </div>
      </div>

      {/* Lease details */}
      <div className="grid grid-cols-2 gap-5 p-4 sm:grid-cols-3 lg:grid-cols-6">
        <InfoItem icon={User} label="Landlord" value={landlordName} />
        <InfoItem icon={DoorOpen} label="Unit" value={unit} />
        <InfoItem
          icon={Banknote}
          label="Monthly rent"
          value={`৳${monthlyRent.toLocaleString("en-US")}`}
        />
        <InfoItem
          icon={ShieldCheck}
          label="Security deposit"
          value={`৳${securityDeposit.toLocaleString("en-US")}`}
        />
        <InfoItem icon={CalendarDays} label="Start date" value={formatDate(startDate)} />
        <InfoItem icon={CalendarX} label="End date" value={formatDate(endDate)} />
      </div>

      {/* Lease term progress, active leases only */}
      {status === "active" && (
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Lease term</span>
            <span>{progress}% elapsed</span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-brand-600"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaseCard;