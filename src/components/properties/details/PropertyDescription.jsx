import {  PackageOpen } from 'lucide-react';
import React from 'react';

const PropertyDescription = ({description}) => {
    return (
        <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <PackageOpen className="size-7 text-brand-600" />
                About this property
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">{description}</p>
        </div>
    );
}

export default PropertyDescription;