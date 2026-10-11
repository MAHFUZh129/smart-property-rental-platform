import { Building2, CheckCircle2, Clock, DoorOpen } from 'lucide-react';
import React from 'react';
import StatCard from '../../Sharedui/StatCard';

const   PropertyStats = ({ counts, availableUnits }) => {
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={Building2} label="Total properties" value={counts.all} />
            <StatCard icon={CheckCircle2} label="Live listings" value={counts.approved} />
            <StatCard icon={Clock} label="Awaiting review" value={counts.pending} />
            <StatCard icon={DoorOpen} label="Units available" value={availableUnits} />
        </div>
    );
};

export default PropertyStats;