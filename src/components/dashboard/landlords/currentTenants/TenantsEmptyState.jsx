import { Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const TenantsEmptyState = ({ searching }) => {

    return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Users className="size-7" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">
        {searching ? "No tenants match your search" : "No current tenants yet"}
      </h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        {searching
          ? "Try a different name or property, or clear the filters."
          : "When you approve a rental request, the tenant shows up here with their lease."}
      </p>
      <Link
        href={searching ? "/landlord/dashboard/currentTenants" : "/landlord/dashboard/requests"}
        className="mt-6 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
      >
        {searching ? "Clear filters" : "View rental requests"}
      </Link>
    </div>
    );
};

export default TenantsEmptyState;