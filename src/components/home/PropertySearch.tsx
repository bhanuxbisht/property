"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { searchTabs } from "@/lib/site-config";

export function PropertySearch() {
  const [activeTab, setActiveTab] = useState("buy");
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const base =
      activeTab === "rent" ? "/rent" : activeTab === "sell" ? "/sell" : "/buy";
    const params = query ? `?q=${encodeURIComponent(query)}` : "";
    router.push(`${base}${params}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="mx-auto w-full max-w-[560px]"
    >
      {/* Tabs — reference: active = solid white pill, inactive = charcoal text */}
      <div className="mb-3.5 flex items-center justify-center gap-1.5 sm:gap-3 overflow-x-auto px-1 py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {searchTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 cursor-pointer rounded-full px-3.5 py-1 text-[12px] sm:px-5 sm:py-2 sm:text-[15px] transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-white text-[#181C19] font-medium shadow-[0_2px_12px_rgba(0,0,0,0.07)]"
                : "text-[#181C19]/80 hover:text-black hover:bg-white/40 font-normal"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search bar — glassmorphic pill matching reference proportions */}
      <form
        onSubmit={handleSearch}
        className="search-bar relative flex items-center rounded-full p-1 pl-3.5 sm:p-2 sm:pl-7 pr-1 sm:pr-2 shadow-lg"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe the home you want to live in"
          className="min-w-0 flex-1 bg-transparent text-[12px] sm:text-[15px] text-[#1E2320] placeholder:text-[#1E2320]/55 placeholder:truncate focus:outline-none"
        />
        {!query && (
          <span
            className="cursor-blink pointer-events-none -ml-1 mr-1.5 hidden select-none text-[16px] font-light text-[#1E2320]/40 sm:inline"
            aria-hidden="true"
          >
            |
          </span>
        )}
        <button
          type="button"
          className="mr-1 flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/60 text-[#555] transition-all hover:bg-white hover:text-black sm:mr-2 sm:h-9 sm:w-9"
          aria-label="Filter options"
        >
          <SlidersHorizontal size={15} strokeWidth={1.8} />
        </button>
        <button
          type="submit"
          className="btn-search flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-medium sm:gap-2.5 sm:px-7 sm:py-2.5 sm:text-[15px]"
        >
          <span>Search</span>
          <Search size={14} strokeWidth={2.4} />
        </button>
      </form>
    </motion.div>
  );
}
