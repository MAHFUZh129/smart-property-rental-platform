import { SearchX } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const notFound = () => {
    return (
        <div>
            <main className="flex min-h-[90vh] flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <SearchX className="size-8" />
      </div>
      <h1 className="mt-5 text-xl font-semibold text-slate-900">
        Property not found
      </h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        This listing may have been removed, or the link is incorrect.
      </p>
      <Link
        href="/properties"
        className="mt-6 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Browse all properties
      </Link>
    </main>
        </div>
    );
};

export default notFound