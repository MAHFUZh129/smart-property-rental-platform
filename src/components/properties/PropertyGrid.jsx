import React from 'react';
import PropertyCard from './card/PropertyCard';
import { Link, SearchX } from 'lucide-react';

const PropertyGrid = ({ properties }) => {



    return (
        <div>
            {
               properties.length === 0 ? (
                    <div className="mt-8 rounded-2xl border border-dashed border-brand-200 bg-white px-6 py-16 text-center">
                        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                            <SearchX className="size-8" />
                        </div>
                        <p className="mt-5 text-lg font-semibold text-slate-900">
                            No properties match your filters
                        </p>
                        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
                            Try a different city, a higher budget, or remove some filters.
                        </p>
                        <Link
                            href="/properties"
                            className="mt-6 inline-block rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
                        >
                            Show all properties
                        </Link>
                    </div>
                ) : (
                     <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                ))}
            </div>
                )
            }
           
        </div>
    );
};

export default PropertyGrid;