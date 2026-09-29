import React from 'react';
import PropertyCard from '../card/PropertyCard';

const SimilarProperties = ({properties}) => {
    return (
        <div className="mt-14">
      <h2 className="text-lg font-semibold text-slate-900">
        More Related Properties 
      </h2>
      <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
        </div>
    );
};

export default SimilarProperties;