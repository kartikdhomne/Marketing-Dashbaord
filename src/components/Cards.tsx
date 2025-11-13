
function MetricCard({ title, value, delta }: { title: string; value: string; delta?: string }) {
  return (
    <div className="glass p-4 rounded-2xl shadow-sm border border-white/40">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-2xl font-semibold text-slate-800">{value}</div>
        {delta && <div className="text-sm text-emerald-600 font-medium">+{delta}</div>}
      </div>
    </div>
  );
}

export default function Cards({ top }: { top?: { name: string } | null }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <MetricCard title="Impressions" value="583,000" delta="4.2%" />
      <MetricCard title="Clicks" value="29,200" delta="1.8%" />
      <MetricCard title="Top Campaign" value={top?.name ?? "—"} />
    </div>
  );
}
