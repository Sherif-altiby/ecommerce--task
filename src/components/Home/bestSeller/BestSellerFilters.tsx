import { useLang } from "../../../store/hooks";
import type { Category } from "../../../types";

interface BestSellerFiltersProps {
  categories:     Category[];
  activeCategory: string;
  onSelect:       (cat: string) => void;
}

const BestSellerFilters = ({ categories, activeCategory, onSelect }: BestSellerFiltersProps) => {
  const { isAr, t } = useLang();

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {["All", ...categories.map((c) => c.name)].map((cat) => {
        const isActive = activeCategory === cat;
        const label =
          cat === "All"
            ? t("all")
            : isAr
            ? categories.find((c) => c.name === cat)?.nameAr
            : cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all
              ${isActive
                ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-300"
                : "bg-white border-blue-100 text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
              }`}
            style={{ fontFamily: "inherit" }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default BestSellerFilters;