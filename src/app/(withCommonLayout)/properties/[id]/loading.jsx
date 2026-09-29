import React from 'react';

const Loading = () => {
    return (
        <div>
            <main className="min-h-screen bg-slate-50 pb-20">
                <div className="mx-auto max-w-6xl px-4 pt-6">
                    <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
                    <div className="mt-4 h-80 animate-pulse rounded-2xl bg-slate-200" />
                    <div className="mt-8 grid gap-10 lg:grid-cols-3">
                        <div className="space-y-4 lg:col-span-2">
                            <div className="h-8 w-2/3 animate-pulse rounded bg-slate-200" />
                            <div className="h-24 animate-pulse rounded-xl bg-slate-200" />
                            <div className="h-40 animate-pulse rounded-xl bg-slate-200" />
                        </div>
                        <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Loading;