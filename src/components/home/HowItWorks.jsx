import React from 'react';


const steps = [
  {
    number: "01",
    title: "Search and shortlist",
    description:
      "Filter by location, price, and amenities, then message landlords directly from any listing.",
  },
  {
    number: "02",
    title: "Send a rental request",
    description:
      "Request the unit you want. The landlord reviews it and approves or declines — usually within a day.",
  },
  {
    number: "03",
    title: "Move in and manage everything",
    description:
      "Once approved, your lease, rent payments, and maintenance requests all live in your dashboard.",
  },
];

const HowItWorks = () => {
    return (
        <div className="bg-gradient-to-br from-sky-200 via-blue-950 to-slate-400 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="max-w-md font-serif text-3xl text-white sm:text-4xl">
          How the platform works
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="border-t border-slate-700 pt-6">
              <span className="font-serif text-lg text-brand-400">{step.number}</span>
              <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
        </div>
    );
};

export default HowItWorks;

