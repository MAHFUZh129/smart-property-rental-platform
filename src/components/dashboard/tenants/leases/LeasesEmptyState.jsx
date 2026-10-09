import { FileText } from 'lucide-react';
import React from 'react';

const LeasesEmptyState = () => {
    return (
        
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <FileText className="size-7" />
      </div>
      <p className="mt-4 text-lg font-semibold text-slate-900">No leases yet</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
        Once a landlord approves one of your rental requests, your lease
        agreement will appear here.
      </p>
        </div>
    );
};

export default LeasesEmptyState;