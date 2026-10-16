// "use client"
import { getCurrentUser } from '@/actions/server/auth';
import { getUnreadCount } from '@/actions/server/notifications';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const NotificationBell = ({ initialCount,role }) => {

    const [count, setCount] = useState(initialCount)

    useEffect(() => {

        const refresh = async () => {
            setCount(await getUnreadCount());
        }

        // const timer = setInterval(refresh, 30000)
        window.addEventListener("focus", refresh);

        return () => {
            // clearInterval(timer);
            window.removeEventListener("focus", refresh);
        }

    }, [])

    return (
        
<Link
    href={`/${role}/dashboard/messages`}
    title={count > 0 ? `${count} unread notifications` : "Notifications"}
    aria-label={count > 0 ? `${count} unread notifications` : "Notifications"}

    className="group relative flex size-10.5 items-center justify-center
        rounded-2xl border border-slate-200/80 bg-white
        text-slate-600 shadow-sm transition-all duration-300
        hover:border-brand-200 hover:bg-brand-50
        hover:text-brand-700 hover:shadow-md
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-brand-500 focus-visible:ring-offset-2"
>
    <Bell
        className={`size-[24px] transition-transform duration-300
            group-hover:rotate-[-12deg] group-hover:scale-110
            ${count > 0 ? "animate-none" : ""}`}
        strokeWidth={1.8}
    />

    {count > 0 && (
        <span
            className="absolute -right-1 -top-1 flex h-[19px]
                min-w-[19px] items-center justify-center
                rounded-full border-2 border-white
                bg-rose-500 px-1 text-[12px] font-bold
                leading-none text-white shadow-sm"
        >
            {count > 99 ? "99+" : count}
        </span>
    )}
</Link>
    );
};

export default NotificationBell;