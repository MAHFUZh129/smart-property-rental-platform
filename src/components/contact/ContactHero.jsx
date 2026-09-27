import React from 'react';

const ContactHero = () => {
    return (
            <div className="bg-gradient-to-b from-brand-50 to-white">
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700">
          Contact us
        </span>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.15] tracking-tight text-slate-900 sm:text-5xl">
          We&rsquo;re happy to help.
        </h1>
        <p className="mx-auto mt-5 max-w-[50ch] text-base leading-relaxed text-slate-600">
          Question about a listing, a payment, or setting up a landlord
          account? Send us a message and we&rsquo;ll get back to you within
          one business day.
        </p>
      </div>
        </div>
    );
};

export default ContactHero;