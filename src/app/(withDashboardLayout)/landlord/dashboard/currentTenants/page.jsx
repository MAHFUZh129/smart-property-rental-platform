import React from 'react';
import TenantCard from '@/components/dashboard/landlords/currentTenants/TenantCard';
import TenantFilters from '@/components/dashboard/landlords/currentTenants/TenantFilters';
import TenantsEmptyState from '@/components/dashboard/landlords/currentTenants/TenantsEmptyState';
import TenantStats from '@/components/dashboard/landlords/currentTenants/TenantStats';
import PageHeader from '@/components/dashboard/Sharedui/PageHeader';
import { getCurrentTenants } from '@/actions/server/tenants';
import { daysLeft, SOON_DAYS } from '@/lib/utils/dashboard/Lease-helpers';

export const metadata = {
    title: "Tenant Management | Rentora Dashboard",
    description:
        "Manage current tenants, monitor rental details, and keep track of active leases from your Rentora dashboard.",
    robots: {
        index: false,
        follow: false,
    },
}

const page = async ({ searchParams }) => {

    const { q = "", filter = "" } = await searchParams

    const all = await getCurrentTenants()

    
    const endingSoonList = all.filter((l) => daysLeft(l.endDate) <= SOON_DAYS);
    const monthlyIncome = all.reduce((sum, l) => sum + (l.monthlyRent || 0), 0);
    const depositsHeld = all.reduce((sum, l) => sum + (l.securityDeposit || 0), 0);

    // apply the filter and the search from the URL
    const search = q.trim().toLowerCase();
    const tenants = (filter === "soon" ? endingSoonList : all).filter((l) => {
        if (!search) return true;
        return (
            l.tenant.name.toLowerCase().includes(search) ||
            l.tenant.email.toLowerCase().includes(search) ||
            (l.property?.title || "").toLowerCase().includes(search)
        );
    })

    return (
        <div>
            <PageHeader
                title="Current tenants"
                subtitle="Everyone who is renting your properties right now, with their lease details."
            />

            <div className="mb-6">
                <TenantStats
                    total={all.length}
                    monthlyIncome={monthlyIncome}
                    depositsHeld={depositsHeld}
                    endingSoon={endingSoonList.length}
                />
            </div>

            <div className="mb-6">
                <TenantFilters q={q} filter={filter} total={all.length} endingSoon={endingSoonList.length} />
            </div>

            {tenants.length === 0 ? (
                <TenantsEmptyState searching={Boolean(search || filter)} />
            ) : (
                <div className="grid gap-5 xl:grid-cols-2">
                    {tenants.map((lease) => (
                        <TenantCard key={lease._id} lease={lease} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default page;