import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Camera,
  CalendarDays,
  Check,
  Building2,
  Home,
  DoorOpen,
  Briefcase,
  Armchair,
  Castle,
  Wifi,
  Car,
  Zap,
  ShieldCheck,
  Video,
  Flame,
  Snowflake,
  Sofa,
  Droplets,
  Dumbbell,
  Trees,
  Moon,
  Sun,
  ArrowUpDown,
} from "lucide-react";



//  for each property type
const TYPE_ICONS = {
  Apartment: Building2,
  House: Home,
  Room: DoorOpen,
  Office: Briefcase,
  Studio: Armchair,
  Villa: Castle,
};



// for each amenity 
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

// One small fact with an icon, like "3 beds"
const  Stat =({ icon: Icon, text })=> {
  return (
    <span className="flex items-center gap-2 text-sm text-slate-600">
      <span className="flex size-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
        <Icon className="size-4" />
      </span>
      {text}
    </span>
  );
}

const PropertyCard =({ property }) =>{
  const {
    _id,
    title,
    propertyType,
    area,
    city,
    price,
    bedrooms,
    bathrooms,
    size,
    sizeUnit,
    amenities,
    images,
    availableUnits,
    createdAt,
  } = property;

  console.log(createdAt)

  const TypeIcon = TYPE_ICONS[propertyType] || Building2;

  // Show the first 3 amenities 
  const shownAmenities = amenities.slice(0, 3);
  const extraAmenities = amenities.length - shownAmenities.length;

  // availableUnits condtion
  const isLow = availableUnits <= 2;

  const listedDate = new Date(createdAt.$date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:shadow-brand-900/10">
      {/* image  */}
      <div className="relative h-56 w-full bg-slate-200">
        <Image
          src={images[0]}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />

        {/* dark fade at the bottom */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/10 to-transparent" />

        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
          <TypeIcon className="size-3.5" />
          {propertyType}
        </span>

        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            isLow ? "bg-amber-400 text-amber-950" : "bg-white text-emerald-700"
          }`}
        >
          {isLow
            ? `Only ${availableUnits} left`
            : `${availableUnits} units available`}
        </span>

        <p className="absolute bottom-3 left-4 text-white">
          <span className="text-2xl font-bold">৳{price.toLocaleString("en-US")}</span>
          <span className="text-sm text-slate-200"> / month</span>
        </p>

        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white">
          <Camera className="size-3.5" />
          {images.length}
        </span>
      </div>

      {/* details */}
      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-lg font-semibold leading-snug text-slate-900">
          {title}
        </h2>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="size-4 text-brand-500" />
          {area}, {city}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {bedrooms > 0 && (
            <Stat
              icon={BedDouble}
              text={`${bedrooms} ${bedrooms === 1 ? "bed" : "beds"}`}
            />
          )}
          <Stat
            icon={Bath}
            text={`${bathrooms} ${bathrooms === 1 ? "bath" : "baths"}`}
          />
          <Stat icon={Ruler} text={`${size} ${sizeUnit}`} />
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {shownAmenities.map((item) => {
            const AmenityIcon = AMENITY_ICONS[item] || Check;
            return (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700"
              >
                <AmenityIcon className="size-3.5 text-brand-600" />
                {item}
              </li>
            );
          })}
          {extraAmenities > 0 && (
            <li className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
              +{extraAmenities} more
            </li>
          )}
        </ul>

        {/*bottom of the card */}
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <CalendarDays className="size-3.5" />
              Listed {listedDate}
            </span>
            <Link
              href={`/properties/${_id}`}
              className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-200"
            >
              View details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default  PropertyCard