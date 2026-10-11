import { ArrowLeft, ink } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const BackToProperties = () => {
    return (
        <div>
            <Link href="/landlord/dashboard/properties" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-700">
                <ArrowLeft className="size-4" /> Back to my properties
            </Link>
        </div>
    );
};

export default BackToProperties;