import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Campaign = {
  id: string;
  name: string;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  status: "Active" | "Paused";
  daily?: { date: string; impressions: number; clicks: number }[];
};

export type CampaignState = {
  campaigns: Campaign[];
  filterStatus: "All" | "Active" | "Paused";
  searchQuery: string;
  selectedId?: string;
};

const initialState: CampaignState = {
  filterStatus: "All",
  searchQuery: "",
  selectedId: undefined,
  campaigns: [
    {
      id: "1",
      name: "Spring Promo",
      impressions: 125000,
      clicks: 4500,
      ctr: 3.6,
      conversions: 210,
      status: "Active",
      daily: [
        { date: "2025-11-01", impressions: 4000, clicks: 120 },
        { date: "2025-11-02", impressions: 4500, clicks: 150 },
        { date: "2025-11-03", impressions: 3800, clicks: 110 },
        { date: "2025-11-04", impressions: 4200, clicks: 130 },
        { date: "2025-11-05", impressions: 3900, clicks: 125 },
      ],
    },
    {
      id: "2",
      name: "App Launch",
      impressions: 85000,
      clicks: 2900,
      ctr: 3.41,
      conversions: 130,
      status: "Paused",
      daily: [
        { date: "2025-11-01", impressions: 2100, clicks: 78 },
        { date: "2025-11-02", impressions: 1900, clicks: 65 },
        { date: "2025-11-03", impressions: 2200, clicks: 85 },
        { date: "2025-11-04", impressions: 2500, clicks: 90 },
        { date: "2025-11-05", impressions: 2300, clicks: 80 },
      ],
    },
    {
      id: "3",
      name: "Holiday Blast",
      impressions: 210000,
      clicks: 8200,
      ctr: 3.9,
      conversions: 390,
      status: "Active",
      daily: [
        { date: "2025-11-01", impressions: 8000, clicks: 310 },
        { date: "2025-11-02", impressions: 7500, clicks: 290 },
        { date: "2025-11-03", impressions: 7800, clicks: 305 },
        { date: "2025-11-04", impressions: 8100, clicks: 330 },
        { date: "2025-11-05", impressions: 7900, clicks: 320 },
      ],
    },
    {
      id: "4",
      name: "Referral Campaign",
      impressions: 132000,
      clicks: 4800,
      ctr: 3.63,
      conversions: 250,
      status: "Paused",
      daily: [
        { date: "2025-11-01", impressions: 3500, clicks: 130 },
        { date: "2025-11-02", impressions: 3700, clicks: 140 },
        { date: "2025-11-03", impressions: 3600, clicks: 135 },
        { date: "2025-11-04", impressions: 3400, clicks: 120 },
        { date: "2025-11-05", impressions: 3800, clicks: 145 },
      ],
    },
    {
      id: "5",
      name: "New Year Countdown",
      impressions: 260000,
      clicks: 10300,
      ctr: 3.96,
      conversions: 470,
      status: "Active",
      daily: [
        { date: "2025-11-01", impressions: 9000, clicks: 350 },
        { date: "2025-11-02", impressions: 9500, clicks: 380 },
        { date: "2025-11-03", impressions: 9200, clicks: 360 },
        { date: "2025-11-04", impressions: 9100, clicks: 355 },
        { date: "2025-11-05", impressions: 8900, clicks: 345 },
      ],
    },
  ],
};

const campaignsSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    setFilterStatus: (
      state,
      action: PayloadAction<CampaignState["filterStatus"]>
    ) => {
      state.filterStatus = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload.toLowerCase();
    },
    addCampaign: (state) => {
      const newId = (state.campaigns.length + 1).toString();
      const today = new Date();
      const daily = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (6 - i));
        const impressions = Math.floor(Math.random() * 8000) + 3000;
        const clicks = Math.floor(impressions * (Math.random() * 0.05 + 0.01));
        return { date: d.toISOString().split("T")[0], impressions, clicks };
      });
      state.campaigns.push({
        id: newId,
        name: `New Campaign ${newId}`,
        impressions: daily.reduce((a, d) => a + d.impressions, 0),
        clicks: daily.reduce((a, d) => a + d.clicks, 0),
        ctr: +(
          (daily.reduce((a, d) => a + d.clicks, 0) /
            daily.reduce((a, d) => a + d.impressions, 0)) *
          100
        ).toFixed(2),
        conversions: Math.floor(Math.random() * 300),
        status: Math.random() > 0.5 ? "Active" : "Paused",
        daily,
      });
    },
    deleteCampaign: (state, action: PayloadAction<string>) => {
      state.campaigns = state.campaigns.filter((c) => c.id !== action.payload);

      // if the deleted one was selected, reset selectedId
      if (state.selectedId === action.payload) {
        state.selectedId = undefined;
      }
    },

    setSelectedCampaign: (state, action: PayloadAction<string | undefined>) => {
      state.selectedId = action.payload;
    },
  },
});

export const {
  setFilterStatus,
  setSearchQuery,
  addCampaign,
  setSelectedCampaign,
  deleteCampaign,
} = campaignsSlice.actions;

export default campaignsSlice.reducer;
