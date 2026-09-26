import { Briefcase, Building2, Castle, DoorOpen, Home, Warehouse } from 'lucide-react';
import React from 'react';


const categories = [
  { name: "Apartments", icon: Building2, count: 4820 },
  { name: "Houses", icon: Home, count: 2140 },
  { name: "Rooms", icon: DoorOpen, count: 1360 },
  { name: "Studios", icon: Warehouse, count: 980 },
  { name: "Offices", icon: Briefcase, count: 410 },
  { name: "Villas", icon: Castle, count: 190 },
];



const PropertyCategories = () => {
    

    return (
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
             
      <div className="max-w-xl">
        <h2 className="font-serif text-3xl text-slate-900 sm:text-4xl">
          Browse by category
        </h2>
        <p className="mt-3 text-slate-600">
          Every listing is reviewed before it goes live, so what you see is
          what's actually available.
        </p>
      </div>
 
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map(({ name, icon: Icon, count }) => (
          <a
            key={name}
            href={`/properties?type=${name.toLowerCase()}`}
            className="group flex flex-col items-start gap-3 rounded-xl border border-slate-100 p-5 transition-colors hover:border-brand-200 hover:bg-brand-50"
          >
            <Icon className="h-6 w-6 text-brand-600" strokeWidth={1.75} />
            <div>
              <p className="text-sm font-semibold text-slate-900">{name}</p>
              <p className="text-xs text-slate-500">{count.toLocaleString()} listed</p>
            </div>
          </a>
        ))}
      </div>
        </div>
    );
};

export default PropertyCategories;