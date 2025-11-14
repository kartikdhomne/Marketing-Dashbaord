import type { Campaign } from "../store/campaignsSlice";

export default function CampaignTable({
  campaigns,
  onSelect,
}: {
  campaigns: Campaign[];
  onSelect?: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow ring-1 ring-black/5 dark:ring-slate-700/60 transition-colors duration-500">
      <table
        className="min-w-[750px] w-full divide-y divide-slate-100 dark:divide-slate-700"
        role="table"
      >
        {/* ---------- HEADER ---------- */}
        <thead className="bg-linear-to-r from-white to-slate-50 dark:from-slate-700 dark:to-slate-800">
          <tr>
            {[
              "Campaign",
              "Impr.",
              "Clicks",
              "CTR",
              "Conv.",
              "Status",
              "View",
            ].map((h, i) => (
              <th
                key={i}
                className={`px-4 py-3 text-sm font-medium ${
                  i === 0 ? "text-left" : "text-center"
                } text-white bg-red-400 dark:text-white whitespace-nowrap`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        {/* ---------- BODY ---------- */}
        <tbody className="bg-white dark:bg-[#1e293b] divide-y divide-slate-100 dark:divide-slate-600">
          {campaigns.map((c) => (
            <tr
              key={c.id}
              onClick={() => onSelect?.(c.id)}
              className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-600/60 transition-colors duration-200"
            >
              {/* Campaign name */}
              <td className="px-4 py-3 text-left whitespace-nowrap">
                <div className="text-sm font-medium text-slate-800 dark:text-white">
                  {c.name}
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-300">
                  ID: {c.id}
                </div>
              </td>

              {/* Metrics */}
              <td className="px-4 py-3 text-center text-slate-700 dark:text-white whitespace-nowrap">
                {c.impressions.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-center text-slate-700 dark:text-white whitespace-nowrap">
                {c.clicks.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-center text-slate-700 dark:text-white whitespace-nowrap">
                {c.ctr.toFixed(2)}%
              </td>
              <td className="px-4 py-3 text-center text-slate-700 dark:text-white whitespace-nowrap">
                {c.conversions}
              </td>

              {/* Status */}
              <td className="px-4 py-3 text-center whitespace-nowrap">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    c.status === "Active"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                  }`}
                >
                  {c.status}
                </span>
              </td>

              {/* View Column */}
              <td className="px-4 py-3 text-center whitespace-nowrap">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect?.(c.id);
                  }}
                  className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------- Mobile Scroll ---------- */}
      <div className="sm:hidden text-xs text-slate-500 dark:text-slate-400 text-center py-2">
        ← Swipe to view more →
      </div>
    </div>
  );
}
