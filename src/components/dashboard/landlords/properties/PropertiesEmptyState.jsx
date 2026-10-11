import { Building2, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const PropertiesEmptyState = ({filtered}) => {
    return (
         <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Building2 className="size-7" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">
        {filtered ? "No properties with this status" : "You haven't added any properties yet"}
      </h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        {filtered ? "Try another tab to see your other listings." : "Add your first property and it will go live after an admin reviews it."}
      </p>
      {!filtered && (
        <Link href="/landlord/dashboard/properties/new" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
          <Plus className="size-4" /> Add property
        </Link>
      )}
    </div>
    );
};

export default PropertiesEmptyState;