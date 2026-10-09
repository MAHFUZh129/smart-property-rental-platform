import React from 'react';
import { getCurrentUser } from '@/actions/server/auth';
import { getMyLeases } from '@/actions/server/leases';
import LeaseCard from '@/components/dashboard/tenants/leases/LeaseCard';
import LeasesEmptyState from '@/components/dashboard/tenants/leases/LeasesEmptyState';
import LeaseStatusTabs from '@/components/dashboard/tenants/leases/LeaseStatusTabs';
import PageHeader from '@/components/dashboard/Sharedui/PageHeader';
// import PageHeader from '@/components/properties/PageHeader';


export const metadata = {
    title: "My Leases | Dashboard",
    description:
        "View and manage your rental leases, property details, rent, and lease status.",
};

const Leases = async ({searchParams}) => {

    const {status}= await searchParams

    const user = await getCurrentUser();

    const allLeases = await getMyLeases(user.email)

    const counts = {
    all: allLeases.length,
    active: allLeases.filter((l) => l.status === "active").length,
    expired: allLeases.filter((l) => l.status === "expired").length,
    terminated: allLeases.filter((l) => l.status === "terminated").length,
  };
 
  const leases = status ? allLeases.filter((l) => l.status === status) : allLeases



    return (
        <div>
            <PageHeader
                title="My leases"
                subtitle="All your rental agreements, past and present."
            />
            <div className="mb-6">
                <LeaseStatusTabs active={status} counts={counts} />
            </div>

            {leases.length === 0 ? (
                <LeasesEmptyState />
            ) : (
                <div className="space-y-5">
                    {leases.map((lease) => (
                        <LeaseCard key={lease._id} lease={lease} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Leases;