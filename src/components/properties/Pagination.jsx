import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';


const makeLink = (filters, page) => {

    const params = new URLSearchParams()

    Object.entries({ ...filters, page }).forEach(([key, value]) => {

        if (value) {
            return params.set(key, value)
        }      
    })

    return `/properties?${params.toString()}`

}

const Pagination = ({ filters, page, totalPages }) => {


    if (totalPages <= 1) {
        return null
    }


    const activeStyle = "inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-300 hover:bg-brand-50";
        

    const disabledStyle = "inline-flex items-center gap-1 rounded-xl border border-slate-100 px-4 py-2 text-sm text-slate-300";
        


    return (
        <div>
            <nav className="mt-12 flex items-center justify-center gap-4">
                {page > 1 ? (
                    <Link
                     href={makeLink(filters, page - 1)} 
                     className={activeStyle}
                     >
                        <ChevronLeft className="size-4" />
                        Previous
                    </Link>
                ) : (
                    <span className={disabledStyle}>
                        <ChevronLeft className="size-4" />
                        Previous
                    </span>
                )}

                <span className="text-sm text-slate-600">
                    Page <strong className="text-brand-700">{page}</strong> of {totalPages}
                </span>

                {
                page < totalPages ? (
                    <Link
                     href={makeLink(filters, page + 1)}
                      className={activeStyle}>
                        Next
                        <ChevronRight className="size-4" />
                    </Link>
                ) : (
                    <span className={disabledStyle}>
                        Next
                        <ChevronRight className="size-4" />
                    </span>
                )
                }
            </nav>
        </div>
    );
};

export default Pagination;