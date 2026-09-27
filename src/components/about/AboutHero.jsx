import React from 'react';

const AboutHero = () => {
    return (
           <div className="bg-gradient-to-b from-brand-50 to-white">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700">
          About Rentora
        </span>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.15] tracking-tight text-slate-900 sm:text-5xl">
          Renting shouldn't run on phone calls and paper.
        </h1>
        <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-slate-600">
          Rentora brings property discovery, rental requests, leases,
          payments, maintenance, and reviews into one place — built for
          tenants, landlords, and the people who manage it all.
        </p>
      </div>
        </div>
    );
};

export default AboutHero;