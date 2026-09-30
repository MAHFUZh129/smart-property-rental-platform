'use client'

import React from 'react';
import Link from 'next/link';
import {
    LayoutGrid,
    Building2,
    Home,
    DoorOpen,
    Briefcase,
    Armchair,
    Castle,
    ChevronDown,
} from "lucide-react";
import { useRouter, useSearchParams } from 'next/navigation';

const PROPERTY_TYPES = [
    "Apartment",
    "House",
    "Room",
    "Office",
    "Studio",
    "Villa",
];

// Icons 
const TYPE_ICONS = {
    Apartment: Building2,
    House: Home,
    Room: DoorOpen,
    Office: Briefcase,
    Studio: Armchair,
    Villa: Castle,
};


const makeLink = (filters, type) => {
    const params = new URLSearchParams();
    Object.entries({ ...filters, type, page: "" }).forEach(([key, value]) => {

        if (value) {
            params.set(key, value)
        }
    });

    const text = params.toString();
    return text ? `/properties?${text}` : "/properties";
}



const TypeTabs = ({ filters }) => {

    const active = filters.type || "";

    const tabs = [
        { label: "All", value: "", icon: LayoutGrid },
        ...PROPERTY_TYPES.map((type) => ({
            label: type,
            value: type,
            icon: TYPE_ICONS[type],
        })),
    ];

    const router = useRouter()
    const searchParams = useSearchParams()


    return (
        <div className='flex items-center justify-between'>
            <nav className="mt-6 flex gap-2 overflow-x-auto pb-1">
                {tabs.map(({ label, value, icon: Icon }) => {
                    const isActive = active === value;
                    return (
                        <Link
                            key={label}
                            href={makeLink(filters, value)}
                            className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${isActive
                                ? "border-brand-600 bg-brand-600 text-white"
                                : "border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50"
                                }`}
                        >
                            <Icon className="size-4" />
                            {label}
                        </Link>
                    );
                })}
            </nav>
            {/* sorting properties */}
            <div className='flex items-center gap-2.5'>
                <span className="text-sm font-medium text-slate-600">Sort by</span>

                <div className="relative">
                    <select
                        name="sort"
                        value={filters.sort || "newest"}
                        onChange={(e)=>{
                            const params = new URLSearchParams(searchParams)
                            params.set('sort', e.target.value)
                            params.delete('page')
                            router.push(`/properties?${params}`)

                        }}

                        className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:border-brand-300 hover:shadow-md focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                    >
                        <option value="newest">Newest</option>
                        <option value="price-asc">Price: Low → High</option>
                        <option value="price-desc">Price: High → Low</option>
                        <option value="rating">Highest Rated</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

                </div>


            </div>
        </div>
    );
};

export default TypeTabs;