🧠 Marketing Dashboard

A modern marketing campaign analytics dashboard built with React + TypeScript + Redux Toolkit + Tailwind CSS.
It visualizes campaign performance metrics with interactive charts and offers dark/light theme support with accessibility and SEO optimizations.

🚀 Tech Stack
Layer	Technology
Frontend Framework	React 18

Build Tool	Vite

State Management	Redux Toolkit

Styling	Tailwind CSS

Charts	Recharts

Language	TypeScript
⚙️ Project Setup
1. Clone the repository
git clone https://github.com/<kartikdhomne>/ai-vibe-dashboard.git
cd ai-vibe-dashboard

2. Install dependencies
npm install

3. Run the development server
npm run dev


App will be available at:
👉 http://localhost:5173

4. Build for production
npm run build

5. Preview the production build
npm run preview

🧩 Project Architecture
src/
├── components/
│   ├── Header.tsx             # Top bar with search, theme toggle, and CTA
│   ├── CampaignTable.tsx      # Displays campaigns data in tabular form
│   └── CampaignChart.tsx      # Dynamic chart (CTR vs Date)
│
├── store/
│   ├── store.ts               # Redux store configuration
│   └── campaignsSlice.ts      # Campaign state, reducers, and actions
│
├── App.tsx                    # Root dashboard layout
├── main.tsx                   # Entry point mounting React app
├── index.css                  # Tailwind + global styles
└── vite-env.d.ts              # TypeScript definitions

🏗️ How It Works

State Management (Redux Toolkit):

campaignsSlice.ts stores all campaign data, including:

Campaign details (id, name, impressions, clicks, etc.)

Filter state, search query, selected campaign, etc.

Provides reducers:

addCampaign() → Adds a new campaign with mock data.

deleteCampaign() → Deletes a selected campaign.

setFilterStatus() & setSearchQuery() → Filter/search campaigns.

setSelectedCampaign() → Select campaign for the chart view.

UI Layer (React + Tailwind):

Header: Search input, theme toggle, and “New Campaign” CTA.

CampaignTable: Displays campaign stats; fully responsive with scroll on mobile.

CampaignChart: Line chart (CTR% vs Date) with theme-aware colors.

Dark/Light Mode: Controlled via a theme toggle button in the header.

Charts (Recharts):

Plots CTR (%) over the last 7 days for the selected campaign.

Color-coded lines depending on campaign status (Active / Paused).

Dynamic tooltip and grid for accessibility.

Accessibility & SEO:

Keyboard navigable.

High color contrast in dark/light mode.

Semantic headings and ARIA labels.

Meta tags and Open Graph structure (in index.html).

Supports prefers-reduced-motion and smooth focus states.

💡 Features

✅ Add / Delete campaigns dynamically
✅ Search campaigns by name
✅ Dark & Light theme toggle
✅ Responsive grid layout (chart + table side by side)
✅ Chart visualization with Recharts
✅ Mobile-friendly horizontal table scroll
✅ Keyboard & screen reader friendly


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
✨ Author

Kartik Dhomne
Frontend Engineer — React | TypeScript | UI/UX Focused
LinkedIn :- https://linkedin.com/in/<kartik-dhomne>
 | Portfolio :- https://<kartikdhomne.vercel.app>
