import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import React from 'react';

const STATUS_STYLES = {
  active: { icon: CheckCircle2, className: "bg-emerald-100 text-emerald-700" },
  expired: { icon: Clock, className: "bg-slate-100 text-slate-600" },
  terminated: { icon: XCircle, className: "bg-red-100 text-red-700" },
};


const LeaseStatusBadge = ({status}) => {

    const config = STATUS_STYLES[status]

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

export default LeaseStatusBadge;