import React from 'react';
import { ArrowUpDown, Building2, Car, Check, Droplets, Dumbbell, Flame, Moon, ShieldCheck, Snowflake, Sofa, Sparkles, Sun, Trees, Video, Wifi, Zap } from 'lucide-react';


const AMENITY_ICONS = {
  WiFi: Wifi,
  Parking: Car,
  Elevator: ArrowUpDown,
  Generator: Zap,
  "Security Guard": ShieldCheck,
  CCTV: Video,
  "Gas Supply": Flame,
  Balcony: Sun,
  "Air Conditioning": Snowflake,
  Furnished: Sofa,
  "Rooftop Access": Building2,
  "Water Supply 24/7": Droplets,
  Gym: Dumbbell,
  Playground: Trees,
  "Prayer Room": Moon,
};


const PropertyAmenities = ({amenities}) => {

     if (!amenities || amenities.length === 0){
        return null
     }


    return (
        <div>
             <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
        <Sparkles className="size-5 text-brand-600" />
        Amenities
      </h2>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {amenities.map((item) => {
          const AmenityIcon = AMENITY_ICONS[item] || Check;
          return (
            <li
              key={item}
              className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700"
            >
              <AmenityIcon className="size-4 shrink-0 text-brand-600" />
              {item}
            </li>
          );
        })}
      </ul>
        </div>
    );
};

export default PropertyAmenities;