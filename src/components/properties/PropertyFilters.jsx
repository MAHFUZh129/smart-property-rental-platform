import React from 'react';

import Link from "next/link";
import { Search, MapPin, BedDouble, Banknote, X } from "lucide-react";
import { districts } from '@/data/districts';


const PropertyFilters = ({filters}) => {

    console.log(filters)


    const inputStyle =
        "w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-100";

    return (
        <form
            action="/properties"
            method="get"
            className="relative z-10 -mt-12 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-brand-900/5 sm:grid-cols-2 lg:grid-cols-5"
        >
            {/* Keep the selected type when the form is submitted */}
            <input type="hidden" name="type" value={filters.type || ""} />

            {/* search by title or area */}
            <div className="lg:col-span-2">

                <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand-500" />
                    <input
                        type="text"
                        name="search"
                        placeholder="Search by title or area"
                        defaultValue={filters.search || ""}
                        className={inputStyle}
                    />
                </div>

            </div>


            {/* search by cities  */}
            <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand-500" />
                <select name="city" defaultValue={filters.city || ""} className={inputStyle}>
                    <option value="">Select Division</option>

                    {
                        districts.map((district)=>  <option key={district.name} value={district.name} >{district.name}</option>)
                    }
                </select>
            </div>

            {/* search by bedrooms  */}
            <div className="relative">
                <BedDouble className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand-500" />
                <select
                    name="bedrooms"
                    defaultValue={filters.bedrooms || ""}
                    className={inputStyle}
                >
                    <option value="">Any bedrooms</option>
                    <option value="1">1+ bedrooms</option>
                    <option value="2">2+ bedrooms</option>
                    <option value="3">3+ bedrooms</option>
                    <option value="4">4+ bedrooms</option>
                </select>
            </div>

            {/* max price */}
            <div className="relative">
                <Banknote className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand-500" />
                <input
                    type="number"
                    name="maxPrice"
                    min="0"
                    placeholder="Max price (৳)"
                    defaultValue={filters.maxPrice || ""}
                    className={inputStyle}
                />
            </div>
            {/* <FilterField icon={Banknote}>
                <input
                    type="number"
                    name="maxPrice"
                    min="0"
                    placeholder="Max price (৳)"
                    defaultValue={filters.maxPrice || ""}
                    className={inputStyle}
                />
            </FilterField> */}

            <div className="flex items-center justify-end gap-3 sm:col-span-2 lg:col-span-4">
                <Link
                    href="/properties"
                    className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                    <X className="size-4" />
                    Clear filters
                </Link>
            </div>

            <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-200"
            >
                <Search className="size-4" />
                Search
            </button>
        </form>
    );
};

export default PropertyFilters;