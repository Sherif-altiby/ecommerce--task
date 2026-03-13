// src/pages/Catalog/CatalogHeader.tsx
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import type { FilterState } from "../../types";
import { useLang } from "../../store/hooks";


interface CatalogHeaderProps {
  totalProducts:      number;
  sortBy:             FilterState["sortBy"];
  onSortChange:       (v: FilterState["sortBy"]) => void;
  onMobileFilter:     () => void;
  activeFilterCount:  number;
}

const CatalogHeader = ({
  totalProducts,
  sortBy,
  onSortChange,
  onMobileFilter,
  activeFilterCount,
}: CatalogHeaderProps) => {
  const { isAr } = useLang();

  const sortOptions: { value: FilterState["sortBy"]; labelEn: string; labelAr: string }[] = [
    { value: "newest",     labelEn: "Newest",          labelAr: "الأحدث"           },
    { value: "price_asc",  labelEn: "Price: Low → High", labelAr: "السعر: الأقل أولاً" },
    { value: "price_desc", labelEn: "Price: High → Low", labelAr: "السعر: الأعلى أولاً"},
    { value: "rating",     labelEn: "Top Rated",        labelAr: "الأعلى تقييماً"   },
  ];

  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {isAr ? "كتالوج " : "Product "}
          <span className="text-blue-600">{isAr ? "المنتجات" : "Catalog"}</span>
        </h1>
        <p className="text-sm text-slate-400 mt-0.5">
          {totalProducts} {isAr ? "منتج" : "products found"}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Mobile filter button */}
        <button
          onClick={onMobileFilter}
          className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-100 bg-white text-sm font-semibold text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all relative"
        >
          <SlidersHorizontal size={15} />
          {isAr ? "تصفية" : "Filters"}
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -end-1.5 w-4 h-4 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Sort */}
        <div className="flex items-center gap-2 bg-white border border-blue-100 rounded-xl px-3 py-2">
          <ArrowUpDown size={13} className="text-slate-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as FilterState["sortBy"])}
            className="text-xs font-semibold text-slate-600 bg-transparent outline-none cursor-pointer"
            style={{ fontFamily: "inherit" }}
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {isAr ? o.labelAr : o.labelEn}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CatalogHeader;