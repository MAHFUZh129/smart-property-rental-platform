import { Armchair, Briefcase, Building2, Castle, DoorOpen, Home, MapPin, TypeIcon } from 'lucide-react';
import React from 'react';


const TYPE_ICONS = {
  Apartment: Building2,
  House: Home,
  Room: DoorOpen,
  Office: Briefcase,
  Studio: Armchair,
  Villa: Castle,
};


const PropertyHeader = ({ property }) => {

    const { title, propertyType, area, city, address, availableUnits } = property

    const TypeIcon = TYPE_ICONS[propertyType] || Building2;
    const isLow = availableUnits <= 2;

    return (
        <div>
            <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
                    <TypeIcon className="size-4" />
                    {propertyType}
                </span>
                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${isLow ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-700"
                        }`}
                >
                    {isLow ? `Only ${availableUnits} left` : `${availableUnits} units available`}
                </span>
            </div>

            <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                {title}
            </h1>

            <p className="mt-2 flex items-center gap-1.5 text-slate-500">
                <MapPin className="size-4 text-brand-500" />
                {address}, {area}, {city}
            </p>
        </div>
    );
};

export default PropertyHeader;