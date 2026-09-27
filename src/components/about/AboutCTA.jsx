import Link from 'next/link';
import React from 'react';

const AboutCTA = () => {
    return (
             <div className="bg-white">
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-brand-600 px-8 py-14 text-center sm:px-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium text-white sm:text-3xl">
            Ready to see Rentora in action?
          </h2>
          <p className="max-w-[46ch] text-brand-50">
            Browse live listings as a tenant, or list your first property as
            a landlord — it takes a couple of minutes to get started.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/properties"
              className="rounded-lg bg-white px-5 py-3 text-[15px] font-medium text-brand-700 transition-colors hover:bg-brand-50"
            >
              Browse properties
            </Link>
            <Link
              href="/register?role=landlord"
              className="rounded-lg border border-brand-400 px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-brand-500"
            >
              List your property
            </Link>
          </div>
        </div>
      </div>
        </div>
    );
};

export default AboutCTA;