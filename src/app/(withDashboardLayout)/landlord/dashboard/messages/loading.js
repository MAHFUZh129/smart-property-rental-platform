export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="mb-6 h-8 w-48 rounded-lg bg-slate-200" />
      <div className="space-y-px overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-20 bg-slate-100" />)}
      </div>
    </div>
  );
}