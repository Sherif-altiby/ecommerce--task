import { X, Star, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { Category, FilterState } from "../../types";
import { useLang } from "../../store/hooks";

export interface SidebarFilterProps {
  filters:     FilterState;
  categories:  Category[];
  activeCount: number;
  onUpdate:    (key: keyof FilterState, value: FilterState[keyof FilterState]) => void;
  onClear:     () => void;
  onClose?:    () => void;
}

const PRICE_MAX = 9999;

// ── Collapsible section ───────────────────────────────────
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-blue-50 pb-5 mb-5 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full mb-3 group"
      >
        <span className="text-sm font-bold text-slate-700">{title}</span>
        {open
          ? <ChevronUp   size={14} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
          : <ChevronDown size={14} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
        }
      </button>
      {open && children}
    </div>
  );
};

// ── Dual-handle price range ───────────────────────────────
const PriceRange = ({
  priceMin, priceMax, onUpdate,
}: {
  priceMin: number;
  priceMax: number;
  onUpdate: SidebarFilterProps["onUpdate"];
}) => {
  const minPct = (priceMin / PRICE_MAX) * 100;
  const maxPct = (priceMax / PRICE_MAX) * 100;

  return (
    <div>
      {/* Price labels */}
      <div className="flex justify-between items-center mb-3">
        <div className="px-2.5 py-1 bg-blue-50 border border-blue-100 rounded-lg text-xs font-bold text-blue-700">
          ${priceMin}
        </div>
        <div className="h-px flex-1 mx-2 bg-blue-100" />
        <div className="px-2.5 py-1 bg-blue-50 border border-blue-100 rounded-lg text-xs font-bold text-blue-700">
          {priceMax >= PRICE_MAX ? "Any" : `$${priceMax}`}
        </div>
      </div>

      {/* Dual slider track */}
      <div className="relative h-5 flex items-center">
        {/* Track background */}
        <div className="absolute w-full h-1.5 bg-slate-200 rounded-full" />

        {/* Active range highlight */}
        <div
          className="absolute h-1.5 bg-blue-500 rounded-full"
          style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
        />

        {/* Min thumb */}
        <input
          type="range"
          min={0}
          max={PRICE_MAX}
          value={priceMin}
          onChange={(e) => {
            const val = Math.min(Number(e.target.value), priceMax - 1);
            onUpdate("priceMin", val);
          }}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: priceMin > PRICE_MAX - 100 ? 5 : 3 }}
        />

        {/* Max thumb */}
        <input
          type="range"
          min={0}
          max={PRICE_MAX}
          value={priceMax}
          onChange={(e) => {
            const val = Math.max(Number(e.target.value), priceMin + 1);
            onUpdate("priceMax", val);
          }}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 4 }}
        />

        {/* Visual min thumb dot */}
        <div
          className="absolute w-4 h-4 rounded-full bg-white border-2 border-blue-500 shadow-md shadow-blue-200 pointer-events-none transition-transform hover:scale-110"
          style={{ left: `calc(${minPct}% - 8px)`, zIndex: 6 }}
        />

        {/* Visual max thumb dot */}
        <div
          className="absolute w-4 h-4 rounded-full bg-white border-2 border-blue-500 shadow-md shadow-blue-200 pointer-events-none"
          style={{ left: `calc(${maxPct}% - 8px)`, zIndex: 6 }}
        />
      </div>

      {/* Number inputs */}
      <div className="flex items-center gap-2 mt-4">
        <input
          type="number" min={0} max={priceMax - 1}
          value={priceMin}
          onChange={(e) => onUpdate("priceMin", Math.min(Number(e.target.value), priceMax - 1))}
          className="w-full px-2 py-1.5 text-xs rounded-lg border border-blue-100 bg-blue-50 outline-none focus:border-blue-400 text-center font-semibold"
          style={{ fontFamily: "inherit" }}
        />
        <span className="text-slate-300 font-bold text-sm shrink-0">—</span>
        <input
          type="number" min={priceMin + 1} max={PRICE_MAX}
          value={priceMax}
          onChange={(e) => onUpdate("priceMax", Math.max(Number(e.target.value), priceMin + 1))}
          className="w-full px-2 py-1.5 text-xs rounded-lg border border-blue-100 bg-blue-50 outline-none focus:border-blue-400 text-center font-semibold"
          style={{ fontFamily: "inherit" }}
        />
      </div>
    </div>
  );
};

// ── Main SidebarFilter ────────────────────────────────────
const SidebarFilter = ({
  filters, categories, activeCount, onUpdate, onClear, onClose,
}: SidebarFilterProps) => {
  const { isAr, t } = useLang();

  // Resolve selected category objects from the tree
  const selectedMain  = categories.find((c) => c.name === filters.mainCategory) ?? null;
  const selectedSub   = selectedMain
    ? (selectedMain.subCategories ?? []).find((s) => s.name === filters.subCategory) ?? null
    : null;

  return (
    <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-sm">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-extrabold text-slate-900">{t("filter.title")}</h3>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button onClick={onClear} className="flex items-center gap-1 text-xs text-red-500 font-semibold hover:text-red-600 transition-colors">
              <RotateCcw size={11} /> {t("filter.clear")}
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
      <Section title={t("filter.search")}>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onUpdate("search", e.target.value)}
          placeholder={t("filter.searchPlaceholder")}
          className="w-full px-3 py-2.5 text-sm rounded-xl border border-blue-100 bg-blue-50 outline-none focus:border-blue-400 focus:bg-white transition-all placeholder:text-slate-300"
          style={{ fontFamily: "inherit" }}
        />
      </Section>

      {/* ── Category — 3 levels ── */}
      <Section title={t("filter.category")}>

        {/* Level 1 */}
        <div className="space-y-1.5 mb-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onUpdate("mainCategory", filters.mainCategory === cat.name ? "" : cat.name);
                onUpdate("subCategory",   "");
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

        {/* Level 2 — Sub */}
        {selectedMain && (selectedMain.subCategories ?? []).length > 0 && (
          <div className="ms-3 border-s-2 border-blue-100 ps-3 space-y-1.5 mb-3">
            <p className="text-xs text-slate-400 font-semibold mb-2">{t("filter.subCategory")}</p>
            {(selectedMain.subCategories ?? []).map((sub) => (
              <button
                key={sub.id}
                onClick={() => {
                  onUpdate("subCategory",   filters.subCategory === sub.name ? "" : sub.name);
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

        {/* Level 3 — Child */}
        {selectedSub && (selectedSub.childCategories ?? []).length > 0 && (
          <div className="ms-6 border-s-2 border-indigo-100 ps-3 space-y-1.5">
            <p className="text-xs text-slate-400 font-semibold mb-2">{t("filter.childCategory")}</p>
            {(selectedSub.childCategories ?? []).map((child) => (
              <button
                key={child.id}
                onClick={() =>
                  onUpdate("childCategory", filters.childCategory === child.name ? "" : child.name)
                }
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

      {/* ── Price Range — dual handle ── */}
      <Section title={t("filter.priceRange")}>
        <PriceRange
          priceMin={filters.priceMin}
          priceMax={filters.priceMax}
          onUpdate={onUpdate}
        />
      </Section>

      {/* ── Rating ── */}
      <Section title={t("filter.rating")}>
        <div className="space-y-1.5">
          {[0, 4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() => onUpdate("rating", filters.rating === r ? 0 : r)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all border
                ${filters.rating === r
                  ? "bg-amber-50 border-amber-200 text-amber-700"
                  : "bg-slate-50 border-transparent text-slate-600 hover:bg-amber-50 hover:text-amber-700"
                }`}
              style={{ fontFamily: "inherit" }}
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={11}
                    fill={i < r ? "#F59E0B" : "none"}
                    stroke={i < r ? "#F59E0B" : "#CBD5E1"}
                  />
                ))}
              </div>
              <span>{r === 0 ? t("filter.allRatings") : `${r}+ ${t("filter.stars")}`}</span>
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default SidebarFilter;