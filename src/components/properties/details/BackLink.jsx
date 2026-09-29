import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const BackLink = () => {
    return (
         <Link
      href="/properties"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-700"
    >
      <ArrowLeft className="size-4" />
      Back to all properties
    </Link>
    );
};

export default BackLink;