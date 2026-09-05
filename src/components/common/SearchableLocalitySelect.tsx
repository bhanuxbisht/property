"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check, MapPin } from "lucide-react";
import { JAIPUR_LOCALITIES } from "@/lib/jaipur-areas";

interface SearchableLocalitySelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export function SearchableLocalitySelect({
  value,
  onChange,
  label = "Property Locality in Jaipur",
  placeholder = "Select or search locality...",
  required = true,
}: SearchableLocalitySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [customLocality, setCustomLocality] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if current value is in predefined list
  const isKnownLocality = JAIPUR_LOCALITIES.includes(value as typeof JAIPUR_LOCALITIES[number]);
  const isOther = value === "Other" || (!isKnownLocality && value.trim() !== "");

  // Outside click to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredLocalities = JAIPUR_LOCALITIES.filter((loc) =>
    loc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (loc: string) => {
    if (loc === "Other") {
      onChange("Other");
    } else {
      onChange(loc);
    }
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setCustomLocality(text);
    onChange(text || "Other");
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <MapPin size={13} className="text-terracotta" />
            {label} {required && <span className="text-terracotta">*</span>}
          </span>
          <span className="text-[11px] text-[#1E2320]/50 font-normal">
            40+ Jaipur Areas
          </span>
        </label>
      )}

      {/* Main trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-[#1E2320]/15 bg-white px-3.5 py-3 text-left text-sm text-[#1E2320] focus:border-terracotta focus:outline-none transition-colors"
      >
        <span className={value ? "font-medium" : "text-[#1E2320]/40"}>
          {value === "Other" && customLocality
            ? customLocality
            : value || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-[#1E2320]/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1 max-h-64 overflow-hidden rounded-2xl border border-[#1E2320]/15 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-150">
          {/* Live Search Input inside Dropdown */}
          <div className="sticky top-0 border-b border-[#1E2320]/10 bg-white p-2">
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1E2320]/40"
              />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type area (e.g. Vaishali, Sikar Road, Mansarovar)..."
                className="w-full rounded-lg border border-[#1E2320]/15 bg-[#FDFBF7] py-2 pl-9 pr-3 text-xs text-[#1E2320] placeholder:text-[#1E2320]/40 focus:border-terracotta focus:outline-none"
              />
            </div>
          </div>

          {/* List of Localities */}
          <div className="max-h-48 overflow-y-auto p-1 divide-y divide-gray-50">
            {filteredLocalities.length === 0 ? (
              <div className="p-3 text-center text-xs text-[#1E2320]/60">
                No area matches &ldquo;{searchQuery}&rdquo;.
                <button
                  type="button"
                  onClick={() => handleSelect("Other")}
                  className="block mx-auto mt-1.5 text-xs font-semibold text-terracotta underline"
                >
                  Click here to type &ldquo;{searchQuery}&rdquo; as Other
                </button>
              </div>
            ) : (
              filteredLocalities.map((loc) => {
                const isSelected =
                  value === loc || (loc === "Other" && isOther);
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => handleSelect(loc)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                      isSelected
                        ? "bg-terracotta/10 text-terracotta font-semibold"
                        : "text-[#1E2320] hover:bg-[#1E2320]/5"
                    }`}
                  >
                    <span>{loc}</span>
                    {isSelected && <Check size={14} className="text-terracotta" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* If "Other" is selected, show an inline input for custom locality */}
      {isOther && (
        <div className="mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
          <label className="block text-[11px] font-semibold text-terracotta mb-1">
            Specify Your Exact Locality / Colony in Jaipur:
          </label>
          <input
            type="text"
            required={required}
            value={customLocality}
            onChange={handleCustomChange}
            placeholder="e.g. Khatipura, Jagatpura Extension, Niwaru Bypass..."
            className="w-full rounded-xl border border-terracotta/40 bg-white p-2.5 text-xs text-[#1E2320] focus:border-terracotta focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
