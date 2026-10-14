import { CalendarClock, Search, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const TenantFilters = ({ q, filter, total, endingSoon }) => {

    const pill = (active) =>
        `inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${active
            ? "border-brand-600 bg-brand-600 text-white"
            : "border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50"
        }`;


    const hrefFor = (value) => {
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (value) params.set("filter", value);
        const qs = params.toString();
        return qs ? `/landlord/dashboard/currentTenants?${qs}` : "/landlord/dashboard/currentTenants";
    }


    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <nav className="flex gap-2 overflow-x-auto pb-1">
                <Link href={hrefFor("")} className={pill(!filter)}>
                    <Users className="size-4" /> All tenants
                    <span className="rounded-full bg-black/10 px-1.5 text-xs">{total}</span>
                </Link>
                <Link href={hrefFor("soon")} className={pill(filter === "soon")}>
                    <CalendarClock className="size-4" /> Ending soon
                    <span className="rounded-full bg-black/10 px-1.5 text-xs">{endingSoon}</span>
                </Link>
            </nav>
            <form action="/landlord/dashboard/currentTenants" className="relative w-full md:max-w-xs">
                {filter && <input type="hidden" name="filter" value={filter} />}
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                    name="q"
                    defaultValue={q}
                    placeholder="Search tenant or property"
                    className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3.5 text-sm outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
            </form>
        </div>
    );
};

export default TenantFilters;