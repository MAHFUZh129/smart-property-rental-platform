import { BellOff } from 'lucide-react';
import React from 'react';

const MessagesEmptyState = ({ unreadOnly }) => {
    return (
        <div className="flex flex-col items-center px-6 py-16 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <BellOff className="size-7" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {unreadOnly ? "You're all caught up" : "No messages yet"}
            </h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
                {unreadOnly
                    ? "You have no unread messages."
                    : "Updates about requests, leases, reviews and properties will show up here."}
            </p>
        </div>
    );
};

export default MessagesEmptyState;