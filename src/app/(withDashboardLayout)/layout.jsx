import React from 'react';
import { getCurrentUser } from '@/actions/server/auth';
import DashboardShell from '@/components/dashboard/layout/DashboardShell';
import { getNavItems } from '@/data/dashboard-Nav/dashboard-nav';
import { redirect } from 'next/navigation';




 
 

const Layout = async ({ children }) => {

    // only logged-in users can see the dashboard
    const user = await getCurrentUser();

    if (!user) {
        redirect("/api/auth/signin?callback='/'");
    }

    const role = user.role || 'tenant'


    return (
        <div >
            <DashboardShell user={user} role={role}>
                {children}
            </DashboardShell>
        </div>
    );
};

export default Layout;