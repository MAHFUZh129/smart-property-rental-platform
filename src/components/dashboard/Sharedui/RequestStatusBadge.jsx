import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import React from 'react';


const STATUS_STYLES = {
    pending: { icon: Clock, className: "bg-amber-100 text-amber-800" },
    approved: { icon: CheckCircle2, className: "bg-emerald-100 text-emerald-700" },
    rejected: { icon: XCircle, className: "bg-red-100 text-red-700" },
}


const RequestStatusBadge = ({status}) => {

    const config = STATUS_STYLES[status] || STATUS_STYLES.pending
    const Icon = config.icon 
    
    return (
        <div>
            <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${config.className}`}
            >
                <Icon className="size-3.5" />
                {status}
            </span>
        </div>
    );
};

export default RequestStatusBadge;