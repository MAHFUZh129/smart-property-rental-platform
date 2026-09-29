export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="h-72 bg-brand-900" />
      <div className="mx-auto -mt-12 max-w-6xl px-4">
        <div className="h-32 animate-pulse rounded-2xl bg-white shadow-lg" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6,7,8,9].map((n) => (
            <div key={n} className="h-96 animate-pulse rounded-2xl bg-brand-100" />
          ))}
        </div>
      </div>
    </main>
  );
}