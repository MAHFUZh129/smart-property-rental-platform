// Shown while the page loads
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="mb-6 h-8 w-56 rounded-lg bg-slate-200" />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => <div key={i} className="h-32 rounded-2xl bg-slate-200" />)}
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        {[1, 2, 3, 4].map((i) => <div key={i} className="h-60 rounded-2xl bg-slate-200" />)}
      </div>
    </div>
  );
}