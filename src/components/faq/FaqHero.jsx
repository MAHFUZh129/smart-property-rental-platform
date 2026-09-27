import React from 'react';

const FaqHero = () => {
    return (
            <div className="bg-gradient-to-b from-brand-50 to-white">
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700">
          FAQ
        </span>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.15] tracking-tight text-slate-900 sm:text-5xl">
          Questions, answered.
        </h1>
        <p className="mx-auto mt-5 max-w-[50ch] text-base leading-relaxed text-slate-600">
          Everything you need to know about renting, listing, and managing
          properties on Rentora. Can&rsquo;t find it here? Reach out on the{" "}
          <a href="/contact" className="font-medium text-brand-600 hover:text-brand-700">
            contact page
          </a>
          .
        </p>
      </div>
        </div>
    );
};

export default FaqHero;