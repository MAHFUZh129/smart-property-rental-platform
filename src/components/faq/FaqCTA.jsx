import React from 'react';

import Link from "next/link";
import { MessageCircle } from "lucide-react";

const  FaqCTA =() =>{
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-4xl px-6 py-14">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg text-slate-900">
                Still have a question?
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Our team typically replies within one business day.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-lg bg-brand-600 px-5 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-brand-700"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FaqCTA;
