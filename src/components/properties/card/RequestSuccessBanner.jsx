import { CheckCircle2 } from 'lucide-react';
import React from 'react';

const RequestSuccessBanner = () => {
    return (
         <div className="mb-6 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-blue-50 shadow-sm">
            <div className="flex items-start gap-4 px-5 py-4">
                
               
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle2 className="size-5 text-emerald-600" />
                </div>

               
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-emerald-800">
                        Request Sent Successfully
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-emerald-700">
                        Your rental request has been sent to the landlord.
                        You’ll be notified when they respond.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RequestSuccessBanner;