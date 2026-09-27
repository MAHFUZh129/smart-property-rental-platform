import React from 'react';

const Story = () => {
    return (
            <div className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium text-slate-900 sm:text-3xl">
            Why we built this
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Most rentals still get handled the same way they did twenty years
            ago — a phone call to check availability, a paper receipt for
            rent, a text message that gets lost when a pipe bursts at
            midnight. None of it is written down anywhere both sides can see.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            Rentora puts the whole relationship — discovery, requests,
            leases, rent, repairs, and reviews — into one system that
            tenants, landlords, and admins can all rely on.
          </p>
        </div>
 
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-slate-900">
            What that looks like in practice
          </h3>
          <ul className="mt-5 space-y-4">
            {[
              "A tenant can see exactly where a rental request stands, without calling to ask.",
              "A landlord can see every unit, tenant, and payment across all their properties in one dashboard.",
              "An admin can approve listings and step in on disputes with a full record of what happened.",
            ].map((line) => (
              <li key={line} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    
        </div>
    );
};

export default Story;