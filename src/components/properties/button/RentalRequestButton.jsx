'use client'
import React, { useEffect } from 'react';
import { requestRental } from '@/actions/server/rental';
import { ArrowRight, CheckCircle2, CreditCard, LogIn, Send } from 'lucide-react';
import Link from 'next/link';
import Swal from 'sweetalert2';

const RentalRequestButton = ({ propertyId, status, isLoggedIn, hasRequested, requested }) => {

     useEffect(() => {
        if (requested === '1') {
            Swal.fire({
                title: 'Rental Request Submitted!',
                text: 'Your rental request has been sent to the landlord successfully.',
                icon: 'success',
                confirmButtonText: 'Great!',
                confirmButtonColor: '#2563eb',
            });
        }
    }, [requested]);

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

    if (status === 'approved') {
        return <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
            <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-emerald-900">
                        Your Request Is Approved
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-emerald-800">
                        Great news! Your rental request has been approved. Complete your
                        payment to proceed.
                    </p>

                    <Link
                        href="/tenant/dashboard/payments"
                        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-200"
                    >
                        <CreditCard className="size-4" />
                        Pay Now
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        </div>
    }

    return (

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <form action={requestRental}>
                <input
                    type="hidden"
                    name="propertyId"
                    value={propertyId}
                />

                <button
                    disabled={requested === '1' || hasRequested}
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-brand-200 disabled:cursor-not-allowed disabled:bg-brand-400 disabled:text-white disabled:shadow-none"
                >
                    <Send className="size-4" />

                    {requested === '1' || hasRequested
                        ? 'Rental Requested'
                        : 'Request to Landlord'}
                </button>

                <p className="mt-3 text-center text-xs leading-5 text-gray-500">
                    {requested === '1' || hasRequested
                        ? 'Wait for Approval. Your rental request has already been submitted.'
                        : 'Submit your request to get approval from the landlord.'}
                </p>
            </form>
        </div>
    );
};

export default RentalRequestButton;