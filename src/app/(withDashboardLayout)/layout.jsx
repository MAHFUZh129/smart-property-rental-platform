import React from 'react';
import { getCurrentUser } from '@/actions/server/auth';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';
import { redirect } from 'next/navigation';
import { getUnreadCount } from '@/actions/server/notifications';


const Layout = async ({ children }) => {

    // only logged-in users can see the dashboard
    const user = await getCurrentUser();

    if (!user) {
        redirect("/api/auth/signin?callback='/'");
    }

    const role = user.role || 'tenant'
    const unreadCount = await getUnreadCount()


    return (
        <div >
            <DashboardShell unreadCount={unreadCount} user={user} role={role}>
                {children}
            </DashboardShell>
        </div>
    );
};

export default Layout;