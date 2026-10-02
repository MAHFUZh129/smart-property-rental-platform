
import React from 'react';
import { requestRental } from '@/actions/server/rental';
import { LogIn, Send } from 'lucide-react';
import Link from 'next/link';

const RentalRequestButton = ({ propertyId, isLoggedIn, requested }) => {


    const buttonStyle =
        "flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-200";

    if (!isLoggedIn) {
        return (
            <Link href={`/api/auth/signin?callbackUrl=/properties/${propertyId}`} className={buttonStyle}>
                <LogIn className="size-4" />
                Login to request rental
            </Link>
        );
    }

    return (
        <div>
            <form
                action={requestRental}
            >
                <input type="hidden" name="propertyId" value={propertyId} />
                <button disabled={requested === '1'} type="submit" className={buttonStyle}>
                    <Send className="size-4" />
                    {requested === "1"
                        ? "Rental Requested"
                        : "Request this Rental to Landlord"
                    }
                </button>
            </form>
        </div>
    );
};

export default RentalRequestButton;