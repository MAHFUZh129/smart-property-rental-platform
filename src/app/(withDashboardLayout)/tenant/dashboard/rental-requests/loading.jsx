import React from 'react';

const Loading = () => {
    return (
        <div>
            <div className="mb-6 h-9 w-56 animate-pulse rounded bg-slate-200" />
            <div className="mb-6 flex gap-2">
                {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="h-9 w-24 animate-pulse rounded-full bg-slate-200" />
                ))}
            </div>
            <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                    <div key={n} className="h-28 animate-pulse rounded-2xl bg-slate-200" />
                ))}
            </div>
        </div>
    );
};

export default Loading;