import React from 'react';


const testimonials = [
  {
    quote:
      "I found my apartment, messaged the landlord, and signed the lease without a single phone call. Rent goes out automatically now too.",
    name: "Maya Chen",
    role: "Tenant, Chicago",
  },
  {
    quote:
      "Managing four units used to mean four spreadsheets. Now every request, payment, and maintenance ticket is in one dashboard.",
    name: "David Okafor",
    role: "Landlord, Austin",
  },
  {
    quote:
      "The maintenance tracker alone was worth switching for — I can see exactly when a repair request was picked up.",
    name: "Priya Nair",
    role: "Tenant, Raleigh",
  },
]

const Testimonials = () => {
    return (
              <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <h2 className="font-serif text-3xl text-slate-900 sm:text-4xl">
        What people are saying
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="flex flex-col justify-between">
            <blockquote className="text-slate-700">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-serif text-sm text-brand-700">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    
        </div>
    );
};

export default Testimonials;

