import { CheckCircle2, Clock, Inbox, XCircle } from 'lucide-react';
import React from 'react';

const card = [
  { key: "all", label: "Total requests", icon: Inbox, color: "bg-brand-50 text-brand-600" },
  { key: "pending", label: "Awaiting your reply", icon: Clock, color: "bg-amber-50 text-amber-600" },
  { key: "approved", label: "Approved", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600" },
  { key: "rejected", label: "Rejected", icon: XCircle, color: "bg-red-50 text-red-600" },
];

const LandlordRequestStats = ({ counts }) => {
    return (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {card.map(({ key, label, icon: Icon, color }) => (
                <div
                    key={key}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                    <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${color}`}>
                        <Icon className="size-5" />
                    </span>
                    <div className="min-w-0">
                        <p className="text-2xl font-bold leading-none text-slate-900">{counts[key]}</p>
                        <p className="mt-1 truncate text-xs text-slate-500">{label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LandlordRequestStats;