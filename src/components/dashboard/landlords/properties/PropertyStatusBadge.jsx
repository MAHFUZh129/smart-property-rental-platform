import { CheckCircle2, Clock, EyeOff, XCircle } from 'lucide-react';
import React from 'react';

const STYLES = {
  approved: { label: "Approved", icon: CheckCircle2, className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  pending: { label: "Pending review", icon: Clock, className: "bg-amber-50 text-amber-700 ring-amber-200" },
  rejected: { label: "Rejected", icon: XCircle, className: "bg-red-50 text-red-700 ring-red-200" },
  inactive: { label: "Inactive", icon: EyeOff, className: "bg-slate-100 text-slate-600 ring-slate-200" },
};

const PropertyStatusBadge = ({status}) => {
    const { label, icon: Icon, className } = STYLES[status] || STYLES.pending;

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${className}`}>
            <Icon className="size-3.5" />
            {label}
        </span>
    )
};

export default PropertyStatusBadge;