import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery, addCampaign } from "../store/campaignsSlice";

export default function Header() {
  const dispatch = useDispatch();
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark((prev) => !prev);
  };

  return (
    <header className="w-full py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* --- Section: Logo + Text --- */}
      <div className="flex items-center justify-between sm:justify-start sm:gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg transition-colors duration-300 ${
              isDark
                ? "bg-linear-to-br from-slate-700 to-slate-500"
                : "bg-linear-to-br from-indigo-600 to-blue-400"
            }`}
          >
            AV
          </div>
          <div>
            <h1
              className={`text-2xl font-bold transition-colors duration-300 ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              MarketPulse
            </h1>
            <p
              className={`text-sm transition-colors duration-300 ${
                isDark ? "text-slate-300" : "text-slate-500"
              }`}
            >
              Marketing Dashboard
            </p>
          </div>
        </div>

        {/* --- Theme Toggle --- */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg focus:outline-none focus-visible:ring transition-colors duration-300 sm:hidden ${
            isDark ? "hover:bg-slate-700" : "hover:bg-slate-100"
          }`}
          aria-label="Toggle theme"
        >
          <svg
            className={`w-6 h-6 transition-colors duration-300 ${
              isDark ? "text-slate-100" : "text-slate-600"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1M12 20v1M4.22 4.22l.7.7M18.36 18.36l.7.7M1 12h1M22 12h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>
      </div>

      {/* --- Section: Search + Buttons (desktop) --- */}
      <div className="hidden sm:flex items-center gap-3">
        <div
          className={`flex items-center rounded-lg shadow px-3 py-1 gap-2 transition-colors duration-300 ${
            isDark
              ? "bg-slate-800 border border-slate-600"
              : "bg-white/60 border border-slate-100"
          }`}
        >
          <svg
            className={`w-5 h-5 transition-colors duration-300 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
            />
          </svg>
          <input
            aria-label="Search campaigns"
            className={`bg-transparent outline-none text-sm w-44 transition-colors duration-300 ${
              isDark
                ? "text-slate-100 placeholder-slate-400"
                : "text-slate-700 placeholder-slate-400"
            }`}
            placeholder="Search campaigns..."
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>

        <button
          onClick={() => dispatch(addCampaign())}
          className={`cursor-pointer px-4 py-2 rounded-lg shadow font-medium transition-colors duration-300 ${
            isDark
              ? "bg-indigo-500 hover:bg-indigo-400 text-white"
              : "bg-indigo-600 hover:bg-indigo-500 text-white"
          }`}
        >
          New Campaign
        </button>

        <button
          onClick={toggleTheme}
          className={`cursor-pointer p-2 rounded-lg focus:outline-none focus-visible:ring transition-colors duration-300 hidden sm:block ${
            isDark ? "hover:bg-slate-700" : "hover:bg-slate-100"
          }`}
          aria-label="Toggle theme"
        >
          <svg
            className={`w-6 h-6 transition-colors duration-300 ${
              isDark ? "text-slate-100" : "text-slate-600"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1M12 20v1M4.22 4.22l.7.7M18.36 18.36l.7.7M1 12h1M22 12h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>
      </div>

      {/* --- Mobile-only Search + New Campaign --- */}
      <div className="flex flex-col gap-3 sm:hidden w-full">
        <button
          onClick={() => dispatch(addCampaign())}
          className={`w-full px-4 py-2 rounded-lg shadow font-medium transition-colors duration-300 ${
            isDark
              ? "bg-indigo-500 hover:bg-indigo-400 text-white"
              : "bg-indigo-600 hover:bg-indigo-500 text-white"
          }`}
        >
          New Campaign
        </button>

        <div
          className={`flex items-center rounded-lg shadow px-3 py-1 gap-2 transition-colors duration-300 w-full ${
            isDark
              ? "bg-slate-800 border border-slate-600"
              : "bg-white/60 border border-slate-100"
          }`}
        >
          <svg
            className={`w-5 h-5 transition-colors duration-300 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
            />
          </svg>
          <input
            aria-label="Search campaigns"
            className={`bg-transparent outline-none text-sm flex-1 transition-colors duration-300 ${
              isDark
                ? "text-slate-100 placeholder-slate-400"
                : "text-slate-700 placeholder-slate-400"
            }`}
            placeholder="Search campaigns..."
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>
      </div>
    </header>
  );
}
