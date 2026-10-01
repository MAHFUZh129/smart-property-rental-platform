import { Mail, Phone, ShieldCheck } from 'lucide-react';
import React from 'react';

const LandlordCard = ({landlord}) => {

   
    return (
        <div>
              <h2 className="text-lg font-semibold text-slate-900">Landlord information</h2>
 
      {!landlord ? (
        <p className="mt-3 text-sm text-slate-500">
          Landlord details are not available for this listing yet.
        </p>
      ) : (
        <div className="mt-4 flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
          
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xl font-semibold text-brand-700">
            {landlord.name.charAt(0).toUpperCase()}
          </div>
 
          <div>
            <p className="flex items-center gap-1.5 font-medium text-slate-900">
              {landlord.name}
              <ShieldCheck className="size-4 text-emerald-600" />
            </p>

             <div className="mb-5 flex flex-wrap gap-3 text-sm">
      
              {landlord.email && (
                <a
                  href={`mailto:${landlord.email}`}
                  className="flex items-center gap-1 text-brand-700 hover:underline"
                >
                  <Mail className="size-3.5" />
                  {landlord.email}
                </a>
              )}
            </div>
 
            {landlord.memberSince && (
              <p className="text-md text-emerald-600">
                Member since{" "}
                {new Date(landlord.memberSince).toLocaleDateString("en-GB", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
 
           
          </div>
        </div>
      )}
        </div>
    );
};

export default LandlordCard;