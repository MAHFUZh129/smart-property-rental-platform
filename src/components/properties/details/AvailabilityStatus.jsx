import React from 'react';
import { CircleX, Map } from 'lucide-react';

const AvailabilityStatus = ({availableUnits}) => {

    const isAvailable = availableUnits > 0

    return (
        <div
      className={`flex items-center gap-2 rounded-xl  px-4 py-3 text-sm font-medium ${
        isAvailable
          ? " bg-emerald-50 text-emerald-600"
          : " bg-red-50 text-red-700"
      }`} 
    >
      {isAvailable ? <Map className="size-5" /> : <CircleX className="size-5" />}
      {isAvailable
        ? `Available now — ${availableUnits} ${availableUnits === 1 ? "unit" : "units"} open`
        : "Fully booked right now"}
    </div>
    );
};

export default AvailabilityStatus;