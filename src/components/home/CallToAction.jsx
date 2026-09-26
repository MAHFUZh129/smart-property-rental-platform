import React from 'react';

const CallToAction = () => {
    return (
    
            <div className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
      <div className="flex flex-col items-start gap-8 rounded-3xl bg-brand-600 p-10 sm:flex-row sm:items-center sm:justify-between sm:p-14">
        <div className="max-w-lg">
          <h2 className="font-serif text-3xl text-white sm:text-4xl">
            Own a property? List it in minutes.
          </h2>
          <p className="mt-3 text-brand-100">
            Add your listing, set your price, and start receiving rental
            requests as soon as it's approved.
          </p>
        </div>
        <a
          href="/register?role=landlord"
          className="whitespace-nowrap rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
        >
          List your property
        </a>
      </div>
     
        </div>
    );
};

export default CallToAction;


