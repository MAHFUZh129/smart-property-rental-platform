import { Building2, Sparkles } from "lucide-react";

const  PageHeader =({ total }) =>{

  return (
    <div>
        <header className="relative overflow-hidden bg-brand-900 pb-24 pt-16 text-white">
      {/* Soft decorative circles */}
      <div className="absolute -right-24 -top-24 size-80 rounded-full bg-brand-700/40" />
      <div className="absolute -bottom-32 left-1/3 size-72 rounded-full bg-brand-800/70" />

      <div className="relative mx-auto max-w-6xl px-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-brand-100">
          <Building2 className="size-4" />
          Rentora rentals
        </span>

        <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
          Find a place that feels like home
        </h1>

        <p className="mt-4 max-w-xl text-lg text-brand-200">
          Browse rooms, apartments, houses and offices from local landlords.
          Filter by city, type and budget to see what is available now.
        </p>

        <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-800">
          <Sparkles className="size-4 text-brand-500" />
          {total} {total === 1 ? "property" : "properties"} available
        </p>
      </div>
    </header>
    </div>
    
  );
}


export default  PageHeader