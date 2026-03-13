// src/pages/Catalog/SidebarFilter.tsx
import { X, Star, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { Category, FilterState } from "../../types";
import { useLang } from "../../store/hooks";


interface SidebarFilterProps {
  filters:        FilterState;
  categories:     Category[];
  activeCount:    number;
  onUpdate:       <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onClear:        () => void;
  onClose?:       () => void;  // for mobile drawer
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-blue-50 pb-5 mb-5 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3 group"
      >
        <span className="text-sm font-bold text-slate-700">{title}</span>
        {open
          ? <ChevronUp size={14} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
          : <ChevronDown size={14} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
        }
      </button>
      {open && children}
    </div>
  );
};

const SidebarFilter = ({ filters, categories, activeCount, onUpdate, onClear, onClose }: SidebarFilterProps) => {
  const { isAr } = useLang();

  // Get subcategories for selected main category
  const selectedMain = categories.find((c) => c.name === filters.mainCategory);
  const selectedSub  = selectedMain?.subCategories?.find((s) => s.name === filters.subCategory);

  return (
    <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-sm">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-extrabold text-slate-900">
            {isAr ? "تصفية النتائج" : "Filters"}
          </h3>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button
              onClick={onClear}
              className="flex items-center gap-1 text-xs text-red-500 font-semibold hover:text-red-600 transition-colors"
            >
              <RotateCcw size={11} />
              {isAr ? "مسح" : "Clear"}
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors lg:hidden">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* ── Search ── */}
      <Section title={isAr ? "البحث" : "Search"}>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onUpdate("search", e.target.value)}
          placeholder={isAr ? "ابحث عن منتج..." : "Search products..."}
          className="w-full px-3 py-2.5 text-sm rounded-xl border border-blue-100 bg-blue-50 outline-none focus:border-blue-400 focus:bg-white transition-all placeholder:text-slate-300"
          style={{ fontFamily: "inherit" }}
        />
      </Section>

      {/* ── Category Hierarchy ── */}
      <Section title={isAr ? "الفئة" : "Category"}>
        {/* Main Category */}
        <div className="space-y-1.5 mb-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onUpdate("mainCategory", filters.mainCategory === cat.name ? "" : cat.name);
                onUpdate("subCategory", "");
                onUpdate("childCategory", "");
              }}
              className={`w-full text-start px-3 py-2 rounded-xl text-xs font-semibold transition-all
                ${filters.mainCategory === cat.name
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50 text-slate-600 hover:bg-blue-100 hover:text-blue-700"
                }`}
              style={{ fontFamily: "inherit" }}
            >
              {isAr ? cat.nameAr : cat.name}
              <span className={`float-end text-xs ${filters.mainCategory === cat.name ? "text-blue-200" : "text-slate-400"}`}>
                {cat.productCount}
              </span>
            </button>
          ))}
        </div>

        {/* Sub Category */}
        {selectedMain?.subCategories && selectedMain.subCategories.length > 0 && (
          <div className="ms-3 border-s-2 border-blue-100 ps-3 space-y-1.5 mb-3">
            <p className="text-xs text-slate-400 font-semibold mb-2">
              {isAr ? "الفئة الفرعية" : "Sub Category"}
            </p>
            {selectedMain.subCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => {
                  onUpdate("subCategory", filters.subCategory === sub.name ? "" : sub.name);
                  onUpdate("childCategory", "");
                }}
                className={`w-full text-start px-3 py-2 rounded-xl text-xs font-semibold transition-all
                  ${filters.subCategory === sub.name
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                  }`}
                style={{ fontFamily: "inherit" }}
              >
                {isAr ? sub.nameAr : sub.name}
              </button>
            ))}
          </div>
        )}

        {/* Child Category */}
        {selectedSub?.childCategories && selectedSub.childCategories.length > 0 && (
          <div className="ms-6 border-s-2 border-indigo-100 ps-3 space-y-1.5">
            <p className="text-xs text-slate-400 font-semibold mb-2">
              {isAr ? "الفئة الأدق" : "Child Category"}
            </p>
            {selectedSub.childCategories.map((child) => (
              <button
                key={child.id}
                onClick={() => onUpdate("childCategory", filters.childCategory === child.name ? "" : child.name)}
                className={`w-full text-start px-3 py-2 rounded-xl text-xs font-semibold transition-all
                  ${filters.childCategory === child.name
                    ? "bg-sky-500 text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-sky-50 hover:text-sky-700"
                  }`}
                style={{ fontFamily: "inherit" }}
              >
                {isAr ? child.nameAr : child.name}
              </button>
            ))}
          </div>
        )}
      </Section>

      {/* ── Price Range ── */}
      <Section title={isAr ? "نطاق السعر" : "Price Range"}>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1">
            <label className="text-xs text-slate-400 mb-1 block">{isAr ? "من" : "Min"}</label>
            <input
              type="number"
              min={0}
              max={filters.priceMax}
              value={filters.priceMin}
              onChange={(e) => onUpdate("priceMin", Number(e.target.value))}
              className="w-full px-3 py-2 text-xs rounded-xl border border-blue-100 bg-blue-50 outline-none focus:border-blue-400 focus:bg-white transition-all"
              style={{ fontFamily: "inherit" }}
            />
          </div>
          <div className="mt-4 text-slate-300 font-bold">—</div>
          <div className="flex-1">
            <label className="text-xs text-slate-400 mb-1 block">{isAr ? "إلى" : "Max"}</label>
            <input
              type="number"
              min={filters.priceMin}
              max={9999}
              value={filters.priceMax}
              onChange={(e) => onUpdate("priceMax", Number(e.target.value))}
              className="w-full px-3 py-2 text-xs rounded-xl border border-blue-100 bg-blue-50 outline-none focus:border-blue-400 focus:bg-white transition-all"
              style={{ fontFamily: "inherit" }}
            />
          </div>
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span>${filters.priceMin}</span>
          <span>${filters.priceMax}</span>
        </div>
        <input
          type="range"
          min={0} max={1000}
          value={filters.priceMax}
          onChange={(e) => onUpdate("priceMax", Number(e.target.value))}
          className="w-full mt-2 accent-blue-600"
        />
      </Section>

      {/* ── Rating ── */}
      <Section title={isAr ? "التقييم" : "Rating"}>
        <div className="space-y-1.5">
          {[0, 4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() => onUpdate("rating", filters.rating === r ? 0 : r)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all
                ${filters.rating === r
                  ? "bg-amber-50 border border-amber-200 text-amber-700"
                  : "bg-slate-50 text-slate-600 hover:bg-amber-50 hover:text-amber-700 border border-transparent"
                }`}
              style={{ fontFamily: "inherit" }}
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i} size={11}
                    fill={i < r ? "#F59E0B" : "none"}
                    stroke={i < r ? "#F59E0B" : "#CBD5E1"}
                  />
                ))}
              </div>
              <span>{r === 0 ? (isAr ? "الكل" : "All") : `${r}+ ${isAr ? "نجوم" : "stars"}`}</span>
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default SidebarFilter;