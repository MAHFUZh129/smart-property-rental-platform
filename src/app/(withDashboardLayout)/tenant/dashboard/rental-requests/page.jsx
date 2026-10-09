import { getCurrentUser } from '@/actions/server/auth';
import { getRentalRequests } from '@/actions/server/rental';
import RequestCard from '@/components/dashboard/tenants/rental-requests/RequestCard';
import RequestsEmptyState from '@/components/dashboard/Sharedui/RequestsEmptyState';
import PageHeader from '@/components/dashboard/Sharedui/PageHeader';
import StatusTabs from '@/components/dashboard/Sharedui/StatusTabs';


export const metadata = {
  title: "My rental requests | Dashboard",
}


const RentalRequests = async ({searchParams}) => {

  const {status} = await searchParams

  const user = await getCurrentUser();

  const allRequests = await getRentalRequests(user.email);

  const counts ={
    all: allRequests.length,
    approved: allRequests.filter((r)=> r.status ==='approved').length,
    pending: allRequests.filter((r)=> r.status ==='pending').length,
    rejected: allRequests.filter((r)=> r.status ==='rejected').length,
  }

const requests = status ? allRequests.filter((r)=>r.status=== status) : allRequests

  return (
    <div>
      <PageHeader
        title="My rental requests"
        subtitle="Track the status of the properties you've requested to rent."
      />

      <div className="mb-6">
       
        <StatusTabs active={status} counts={counts} />
      </div>

      {requests.length === 0 ? (
        <RequestsEmptyState role="tenant" />
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <RequestCard key={request._id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RentalRequests;