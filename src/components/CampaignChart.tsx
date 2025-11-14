import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useDispatch } from "react-redux";
import { deleteCampaign } from "../store/campaignsSlice";
import type { Campaign } from "../store/campaignsSlice";

export default function CampaignChart({ campaign }: { campaign: Campaign }) {
  const [isDark, setIsDark] = useState(false);
  const dispatch = useDispatch();

  // Detect dark mode changes dynamically
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true });
    setIsDark(document.documentElement.classList.contains("dark"));
    return () => observer.disconnect();
  }, []);

  // Prepare data for the chart
  const data =
    campaign.daily?.map((d) => ({
      date: d.date.slice(5),
      ctr: +((d.clicks / Math.max(1, d.impressions)) * 100).toFixed(2),
    })) ?? [];

  // Adjusted colors for dark/light modes
  const axisColor = isDark ? "#E2E8F0" : "#475569";
  const gridColor = isDark ? "#334155" : "#E2E8F0";
  const bgColor = isDark ? "#0F172A" : "#FFFFFF";
  const textColor = isDark ? "#F8FAFC" : "#1E293B";

  // Line color varies by campaign status
  const lineColor =
    campaign.status === "Active"
      ? isDark
        ? "#34D399" // emerald-400 (dark)
        : "#059669" // emerald-600 (light)
      : isDark
      ? "#FBBF24" // amber-400 (dark)
      : "#F59E0B"; // amber-500 (light)

  if (!data.length) {
    return (
      <div
        className="h-72 flex items-center justify-center rounded-xl shadow-inner transition-colors duration-500"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <p className="text-sm opacity-80">
          No data available for this campaign.
        </p>
      </div>
    );
  }

  return (
    <div
      className="h-80 w-full flex flex-col rounded-xl p-4 shadow-inner transition-colors duration-500"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* ---- Header */}
      <div className="flex items-center justify-between mb-3">
        <h2
          className={`text-lg font-semibold transition-colors duration-300 ${
            isDark ? "text-white" : "text-slate-800"
          }`}
        >
          {campaign.name} — CTR Trend
        </h2>

        <button
          onClick={() => dispatch(deleteCampaign(campaign.id))}
          className={`cursor-pointer px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200
            ${
              isDark
                ? "bg-rose-700 hover:bg-rose-600 text-white"
                : "bg-rose-100 text-rose-700 hover:bg-rose-200"
            }`}
        >
          Delete Campaign
        </button>
      </div>

      {/* ---- Chart ---- */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
          >
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              stroke={axisColor}
              label={{
                value: "Date (MM-DD)",
                position: "insideBottom",
                offset: -5,
                fill: axisColor,
                fontSize: 12,
              }}
            />
            <YAxis
              stroke={axisColor}
              label={{
                value: "CTR (%)",
                angle: -90,
                position: "insideLeft",
                fill: axisColor,
                fontSize: 12,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1E293B" : "#F9FAFB",
                border: "1px solid #CBD5E1",
                borderRadius: "8px",
                color: textColor,
              }}
              formatter={(value: number) => [`${value}%`, "CTR"]}
            />
            <Line
              type="monotone"
              dataKey="ctr"
              stroke={lineColor}
              strokeWidth={2.5}
              dot={{ r: 3, strokeWidth: 1.5, fill: lineColor }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
