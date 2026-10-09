import { ClipboardList } from 'lucide-react';
import React from 'react';

const RequestsEmptyState = ({role}) => {
    return (

        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <ClipboardList className="size-7" />
            </div>
            <p className="mt-4 text-lg font-semibold text-slate-900">No rental requests yet</p>
            <p className="mt-1 text-sm text-slate-500">
                {role === "tenant"
                    ? "Browse properties and send your first rental request."
                    : "Requests from tenants will show up here."}
            </p>
        </div>
    );
};

export default RequestsEmptyState;