import { lazy, Suspense, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCampaign } from "./store/campaignsSlice";
import type { RootState } from "./store/store";
import Header from "./components/Header";
import CampaignTable from "./components/CampaignTable";

const CampaignChart = lazy(() => import("./components/CampaignChart"));

export default function App() {
  const dispatch = useDispatch();
  const { campaigns, filterStatus, searchQuery, selectedId } = useSelector(
    (s: RootState) => s.campaigns
  );

  const filtered = useMemo(
    () =>
      campaigns.filter(
        (c) =>
          (filterStatus === "All" || c.status === filterStatus) &&
          c.name.toLowerCase().includes(searchQuery)
      ),
    [campaigns, filterStatus, searchQuery]
  );

  const selected = campaigns.find((c) => c.id === selectedId) || campaigns[0];

  return (
    <main
      id="main"
      className="min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8"
    >
      {/* Accessibility skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only absolute bg-indigo-600 text-white p-2 rounded"
      >
        Skip to content
      </a>

      {/* Header */}
      <Header />

      {/* 🔥 Side-by-side layout (Table left, Chart right) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 items-start">
        {/* Campaign Table */}
        <section aria-label="Campaign List">
          <CampaignTable
            campaigns={filtered}
            onSelect={(id) => dispatch(setSelectedCampaign(id))}
          />
        </section>

        {/* Campaign Chart */}
        <section aria-label="Campaign CTR Chart">
          <Suspense
            fallback={
              <div className="h-72 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl" />
            }
          >
            <CampaignChart campaign={selected} />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
