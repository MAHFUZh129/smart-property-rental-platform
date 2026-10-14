import React from 'react';
import StatCard from '../../Sharedui/StatCard';
import { Banknote, CalendarClock, ShieldCheck, Users } from 'lucide-react';

const TenantStats = ({total, monthlyIncome, depositsHeld, endingSoon}) => {


    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={Users} label="Current tenants" value={total} />
            <StatCard icon={Banknote} label="Monthly rent" value={`৳${monthlyIncome.toLocaleString()}`} />
            <StatCard icon={ShieldCheck} label="Deposits held" value={`৳${depositsHeld.toLocaleString()}`} />
            <StatCard icon={CalendarClock} label="Ending soon" value={endingSoon} />
        </div>
    );
};

export default TenantStats;