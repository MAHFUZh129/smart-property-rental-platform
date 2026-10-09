import { updateRentalRequestStatus } from '@/actions/server/rental';
import { Check, X } from 'lucide-react';
import React from 'react';

const RequestActions = ({ requestId }) => {

  return (
    <div className="grid grid-cols-2 gap-2 sm:flex">
      <form
        action={updateRentalRequestStatus}
        className="contents">
        <input type="hidden" name="requestId" value={requestId} />
        <input type="hidden" name="status" value="rejected" />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100"
        >
          <X className="size-4" />
          Reject
        </button>
      </form>

      <form
        action={updateRentalRequestStatus}
        className="contents">
        <input type="hidden" name="requestId" value={requestId} />
        <input type="hidden" name="status" value="approved" />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-200"
        >
          <Check className="size-4" />
          Approve
        </button>
      </form>
    </div>
  );
};

export default RequestActions;