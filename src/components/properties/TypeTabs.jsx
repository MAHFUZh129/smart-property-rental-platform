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
} from "lucide-react";

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


const makeLink =(filters, type) =>{
    const params = new URLSearchParams();
    Object.entries({ ...filters, type, page: "" }).forEach(([key, value]) => {

        if (value){
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


    return (
        <div>
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
        </div>
    );
};

export default TypeTabs;