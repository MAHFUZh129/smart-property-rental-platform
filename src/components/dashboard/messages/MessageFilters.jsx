import React from 'react';
import { markAllAsRead } from '@/actions/server/notifications';
import { CheckCheck, Inbox, MailOpen } from 'lucide-react';
import Link from 'next/link';

const MessageFilters = ({ filter, total, unread }) => {

    const pill = (active) =>
    `inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${
      active
        ? "border-brand-600 bg-brand-600 text-white"
        : "border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50"
    }`

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <nav className="flex gap-2 overflow-x-auto pb-1">
                <Link href="/tenant/dashboard/messages" className={pill(filter !== "unread")}>
                    <Inbox className="size-4" /> All
                    <span className="rounded-full bg-black/10 px-1.5 text-xs">{total}</span>
                </Link>
                <Link href="/tenant/dashboard/messages?filter=unread" className={pill(filter === "unread")}>
                    <MailOpen className="size-4" /> Unread
                    <span className="rounded-full bg-black/10 px-1.5 text-xs">{unread}</span>
                </Link>
            </nav>

            {unread > 0 && (
                <form action={markAllAsRead}>
                    <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                        <CheckCheck className="size-4" /> Mark all as read
                    </button>
                </form>
            )}
        </div>
    );
};

export default MessageFilters;