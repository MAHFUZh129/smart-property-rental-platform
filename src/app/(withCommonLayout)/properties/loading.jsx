export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="h-72 bg-brand-900" />
      <div className="mx-auto -mt-12 max-w-6xl px-4">
        <div className="h-32 animate-pulse rounded-2xl bg-white shadow-lg" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              {/* Image skeleton */}
              <div className="relative h-56 w-full animate-pulse bg-slate-200">
                {/* Property type */}
                <div className="absolute left-3 top-3 h-7 w-24 rounded-full bg-slate-300" />

                {/* Available units */}
                <div className="absolute right-3 top-3 h-7 w-28 rounded-full bg-slate-300" />

                {/* Price */}
                <div className="absolute bottom-3 left-4 h-7 w-36 rounded bg-slate-300" />

                {/* Camera */}
                <div className="absolute bottom-3 right-3 h-6 w-10 rounded-full bg-slate-300" />
              </div>

              {/* Details skeleton */}
              <div className="p-5">
                {/* Title */}
                <div className="h-6 w-4/5 animate-pulse rounded bg-slate-200" />

                {/* Location */}
                <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-slate-200" />

                {/* Stats */}
                <div className="mt-5 flex gap-4">
                  <div className="h-8 w-20 animate-pulse rounded-lg bg-slate-200" />
                  <div className="h-8 w-20 animate-pulse rounded-lg bg-slate-200" />
                  <div className="h-8 w-24 animate-pulse rounded-lg bg-slate-200" />
                </div>

                {/* Amenities */}
                <div className="mt-4 flex gap-2">
                  <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
                  <div className="h-6 w-24 animate-pulse rounded-full bg-slate-200" />
                  <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200" />
                </div>

                {/* Bottom */}
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

                    <div className="h-9 w-28 animate-pulse rounded-xl bg-slate-200" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}