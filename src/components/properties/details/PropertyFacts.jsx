import { Bath, BedDouble, Layers, Ruler } from 'lucide-react';
import React from 'react';



const Fact = ({ icon: Icon, label, value }) => {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
            <span className="flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon className="size-5" />
            </span>
            <div>
                <p className="text-lg font-semibold text-slate-900">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
            </div>
        </div>
    );
}


const PropertyFacts = ({ property }) => {

    const { bedrooms, bathrooms, size, sizeUnit, availableUnits } = property

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {bedrooms > 0 &&
                <Fact icon={BedDouble} label="Bedrooms" value={bedrooms} />
            }
            <Fact icon={Bath} label="Bathrooms" value={bathrooms} />
            <Fact icon={Ruler} label="Size" value={`${size} ${sizeUnit}`} />
            <Fact icon={Layers} label="Available units" value={availableUnits} />
        </div>
    );
};

export default PropertyFacts;