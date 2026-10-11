import { ArrowUpRight } from 'lucide-react';
import React from 'react';

const StatCard = ({ icon: Icon, label, value }) => {
    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-5">
      <div className="flex items-start justify-between gap-3">
        {/* Icon */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
          <Icon size={22} strokeWidth={2} />
        </div>

        {/* Arrow */}
        <ArrowUpRight
          size={18}
          className="text-slate-400 transition-colors group-hover:text-blue-600"
        />
      </div>

      {/* Information */}
      <div className="mt-5">
        <p className="text-sm font-medium text-slate-500">
          {label}
        </p>

        <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {value ?? 0}
        </h3>
      </div>
    </div>
    );
};

export default StatCard;