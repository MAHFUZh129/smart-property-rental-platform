"use client"
import React, { useState } from 'react';
import { LoaderCircle, Trash2 } from 'lucide-react';
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';
import { deleteProperty } from '@/actions/server/properties';


const DeleteProperty = ({ propertyId }) => {

    const [isPending, setIsPending] = useState(false);
    const router = useRouter();



    const handleDelete = async () => {

        const result = await Swal.fire({
            title: "Delete this property?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#64748b",
            reverseButtons: true,
        })

        if (!result.isConfirmed) return;

        setIsPending(true);

        try {
            const response = await deleteProperty(propertyId);

            if (!response.success) {
                await Swal.fire({
                    icon: "error",
                    title: "Unable to delete",
                    text: response.message,
                    confirmButtonColor: "#2563eb",
                });
                return
            }

            await Swal.fire({
                icon: "success",
                title: "Property deleted",
                text: response.message,
                confirmButtonColor: "#2563eb",
            });

            router.push("/landlord/dashboard/properties");
            router.refresh();

        } catch {
            await Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text: "Please try again.",
                confirmButtonColor: "#2563eb",
            });
        } finally {
            setIsPending(false);
        }
    }


    return (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-red-100 bg-red-50/70 p-4 sm:p-5">
            <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                    <Trash2 className="size-5" />
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                        Delete this property
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
                        Permanently remove this property listing from your account.
                    </p>
                </div>
            </div>

            <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition hover:border-red-300 hover:bg-red-600 hover:text-white"
            >
                {isPending ? (
                    <LoaderCircle size={18} className="animate-spin" />
                ) : (
                    <Trash2 size={18} />
                )}

                <span>{isPending ? "Deleting..." : "Delete property"}</span>
            </button>
        </div >

    );
};

export default DeleteProperty;