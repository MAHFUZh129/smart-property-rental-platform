import React from 'react';
import { Building2, CheckCircle2, ClipboardList, FileText, Star, XCircle } from 'lucide-react';
import { openNotification } from '@/actions/server/notifications';
import { timeAgo } from '@/lib/utils/dashboard/notification/notifi-helper';


//     icon + colour for each kind of message
const TYPES = {
    request: { icon: ClipboardList, className: "bg-brand-50 text-brand-600" },
    approved: { icon: CheckCircle2, className: "bg-emerald-50 text-emerald-600" },
    rejected: { icon: XCircle, className: "bg-red-50 text-red-600" },
    lease: { icon: FileText, className: "bg-violet-50 text-violet-600" },
    review: { icon: Star, className: "bg-amber-50 text-amber-600" },
    property: { icon: Building2, className: "bg-sky-50 text-sky-600" },
}

const MessageItem = ({ message }) => {

    const { _id, type, title, message: text, read, createdAt } = message

    const { icon: Icon, className } = TYPES[type] || TYPES.request

    return (
        <div>
            <form action={openNotification}>
                <input type="hidden" name="id" value={_id} />
                <button
                    type="submit"
                    className={`flex w-full items-start gap-4 p-4 text-left transition hover:bg-slate-50 sm:p-5 ${read ? "" : "bg-brand-50/50"
                        }`}
                >
                    <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${className}`}>
                        <Icon className="size-5" />
                    </span>

                    <span className="min-w-0 flex-1">
                        <span className="flex items-start justify-between gap-3">
                            <span className={`text-sm text-slate-900 ${read ? "font-medium" : "font-semibold"}`}>{title}</span>
                            <span className="shrink-0 text-xs text-slate-400">{timeAgo(createdAt)}</span>
                        </span>
                        <span className="mt-0.5 block text-sm text-slate-500">{text}</span>
                    </span>

                    {!read && <span className="mt-2 size-2.5 shrink-0 rounded-full bg-brand-600" aria-label="Unread" />}
                </button>
            </form>
        </div>
    );
};

export default MessageItem;