import React from 'react';

import { Users, Building2, ShieldCheck } from "lucide-react";
 
const audiences = [
  {
    icon: Users,
    title: "Tenants",
    description:
      "Search and filter listings, send rental requests, pay rent, track maintenance, and leave reviews — all from one dashboard.",
  },
  {
    icon: Building2,
    title: "Landlords",
    description:
      "List properties and units, review rental requests, track tenants and earnings, and manage maintenance across every property you own.",
  },
  {
    icon: ShieldCheck,
    title: "Admins",
    description:
      "Approve listings and landlord accounts, oversee every rental and payment on the platform, and step in when something needs attention.",
  },
];

const WhoItsFor = () => {
    return (
             <div className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium text-slate-900 sm:text-3xl">
          Built for everyone in the rental relationship
        </h2>
        <p className="mt-2 max-w-[55ch] text-slate-500">
          Each role sees only what belongs to them — a tenant never sees
          another tenant&rsquo;s lease, and a landlord never sees another
          landlord&rsquo;s properties.
        </p>
 
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {audiences.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-slate-200 bg-white p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg text-slate-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
        </div>
    );
};

export default WhoItsFor;