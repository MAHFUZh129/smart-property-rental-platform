import React from 'react';
import LandlordRequestStats from '@/components/dashboard/landlords/requests/LandlordRequestStats';
import RequestCard from '@/components/dashboard/landlords/requests/RequestCard';
import StatusTabs from '@/components/dashboard/Sharedui/StatusTabs';
import PageHeader from '@/components/dashboard/Sharedui/PageHeader';
import LandlordRequestCard from '@/components/dashboard/landlords/requests/LandlordRequestCard';
import RequestsEmptyState from '@/components/dashboard/Sharedui/RequestsEmptyState';
import { getCurrentUser } from '@/actions/server/auth';
import { getLandlordRentalRequests, getRentalRequests } from '@/actions/server/rental';

export const metadata = {
  title: "Rental requests | Dashboard",
}


const page = async ({ searchParams }) => {

  const { status } = await searchParams;

  const user = await getCurrentUser();


  const allRequests = await getLandlordRentalRequests(user.email)
  const counts = {
    'all': allRequests.length,
    'pending': allRequests.filter((r) => r.status === 'pending').length,
    'approved': allRequests.filter((r) => r.status === 'approved').length,
    'rejected': allRequests.filter((r) => r.status === 'rejected').length,

  }


  const requests = status ? allRequests.filter((r) => r.status === status) : allRequests

  return (
    <div>
      <PageHeader
        title="Rental requests"
        subtitle="Review tenant requests for your properties and respond to them."
      />

      <div className="mb-6">
        <LandlordRequestStats counts={counts} />
      </div>

      <div className="mb-6">
        <StatusTabs active={status} counts={counts} />
      </div>

      {requests.length === 0 ? (
        <RequestsEmptyState role="landlord" />
      ) : (
        <div className="space-y-4">
          {
            requests.map((request) => <LandlordRequestCard key={request._id} request={request} />)
          }

        </div>
      )}

    </div>
  );
};

export default page;