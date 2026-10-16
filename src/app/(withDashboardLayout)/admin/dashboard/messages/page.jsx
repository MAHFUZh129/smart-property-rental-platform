import React from 'react';
import MessageFilters from '@/components/dashboard/messages/MessageFilters';
import MessageItem from '@/components/dashboard/messages/MessageItem';
import MessagesEmptyState from '@/components/dashboard/messages/MessagesEmptyState';
import PageHeader from '@/components/dashboard/Sharedui/PageHeader';
import { getMyNotifications } from '@/actions/server/notifications';


export const metadata = {
    title: "Admin Messages | Rentora Dashboard",
    description:
        "Manage your conversations and communicate seamlessly with tenants, landlords, and the Rentora support team.",
    robots: {
        index: false,
        follow: false,
    },
};


const page = async({searchParams}) => {

    const { filter = "" } = await searchParams;
    // const user = await requireUser("/dashboard/messages");
    // const basePath = getMessagesHref(user.role);

     const all = await getMyNotifications()
     const unreadCount= all.filter((m)=> !m.read).length
     const messages = filter=== 'unread' ? all.filter((m)=> !m.read) : all

    return (
        <div>
            <PageHeader title="Messages" subtitle="Updates about your requests, leases, reviews and properties." />

            <div className="mb-4">
                <MessageFilters
                 filter={filter} 
                 total={all.length}
                  unread={unreadCount}
                //    basePath={basePath}
                    />
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {messages.length === 0 ? (
                    <MessagesEmptyState unreadOnly={filter === "unread"} />
                ) : (
                    <div className="divide-y divide-slate-100">
                        {messages.map((m) => (
                            <MessageItem key={m._id} message={m} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;