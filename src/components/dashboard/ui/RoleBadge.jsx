import React from 'react';


const STYLES = {
    tenant: "bg-brand-50 text-brand-700",
    landlord: "bg-amber-50 text-amber-700",
    admin: "bg-emerald-50 text-emerald-700",
};

const LABELS = {
    tenant: "Tenant",
    landlord: "Landlord",
    admin: "Administrator",
};


const RoleBadge = ({ role }) => {
    return (
        <div>
            <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${STYLES[role] || STYLES.tenant
                    }`}
            >
                {LABELS[role] }
            </span>
        </div>
    );
};

export default RoleBadge;