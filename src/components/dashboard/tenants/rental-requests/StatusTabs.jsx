import React from 'react';
import { CheckCircle2, Clock, ListFilter, XCircle } from 'lucide-react';
import Link from 'next/link';



const TABS = [
    { label: "All", value: "", icon: ListFilter, key: "all" },
    { label: "Pending", value: "pending", icon: Clock, key: "pending" },
    { label: "Approved", value: "approved", icon: CheckCircle2, key: "approved" },
    { label: "Rejected", value: "rejected", icon: XCircle, key: "rejected" },
]


const StatusTabs = ({ active, counts }) => {
    return (
        <div>
            <nav className="flex gap-2 overflow-x-auto pb-1">
                {TABS.map(({ label, value, icon: Icon, key }) => {
                    const isActive = (active || "") === value;

                    const href = value ? `/tenant/dashboard/rental-requests?status=${value}` : "/tenant/dashboard/rental-requests";

                    return (
                        <Link
                            key={key}
                            href={href}
                            className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${isActive
                                ? "border-brand-600 bg-brand-600 text-white"
                                : "border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50"
                                }`}
                        >
                            <Icon className="size-4" />
                            {label}
                            <span
                                className={`rounded-full px-1.5 text-xs ${isActive ? "bg-white/20" : "bg-slate-100 text-slate-500"
                                    }`}
                            >
                                {counts[key]}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default StatusTabs;