import React from 'react';

const PageHeader = ({title, subtitle, children}) => {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
            </div>
            {children && <div className="flex gap-2">{children}</div>}
        </div>
    );
};

export default PageHeader;