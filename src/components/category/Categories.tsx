// src/components/Categories/Categories.tsx
import { ChevronRight, Zap } from "lucide-react";
import { useState }          from "react";
import CategoryCard          from "./CategoryCard";
import { useCategories }     from "../../hooks/useCategories";
import { useLang }           from "../../store/hooks";
import CategorySkeleton      from "../../skeletons/CategorySkeleton";
import ErrorState from "../../errorState/ErrorState";

const Categories = () => {
  const { t, isAr }  = useLang();
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: categories, isLoading, isError, refetch } = useCategories();

  const handleSelect = (name: string) =>
    setActiveCategory((prev) => (prev === name ? "All" : name));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
            <Zap size={15} />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t("home.shopBy")} <span className="text-blue-600">{t("home.category")}</span>
          </h2>
        </div>
        <button
          className="flex items-center gap-1 text-xs font-semibold text-blue-600 border border-blue-100 bg-white rounded-full px-3 py-1.5 hover:bg-blue-50 hover:border-blue-300 transition-all"
          style={{ fontFamily: "inherit" }}
        >
          {t("seeAll")} <ChevronRight size={13} />
        </button>
      </div>

      {/* ── Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <CategorySkeleton key={i} />)

        ) : isError ? (
          <div className="col-span-full">
            <ErrorState
              type="server"
              message={isAr ? "فشل تحميل الفئات" : "Failed to load categories"}
              onRetry={refetch}
            />
          </div>

        ) : (
          categories?.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isActive={activeCategory === cat.name}
              onSelect={handleSelect}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;