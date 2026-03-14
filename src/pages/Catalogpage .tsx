import { X } from "lucide-react";
import { useState } from "react";
import { useLang } from "../store/hooks";
import { useCatalog } from "../hooks/useCatalog";
import SidebarFilter, { type SidebarFilterProps } from "../components/catalog/SidebarFilter";
import CatalogHeader from "../components/catalog/CatalogHeader";
import ProductCard from "../components/product/ProductCard";
import CatalogSkeleton from "../skeletons/CatalogSkeleton";
import Pagination from "../components/catalog/Pagination";



const FilterPanel = ({
  isAr, show, onDismiss, ...sidebarProps
}: SidebarFilterProps & {
  isAr:      boolean;
  show:      boolean;
  onDismiss: () => void;
}) => (
  <>
    <aside className="hidden lg:block w-72 shrink-0">
      <div className="sticky top-24">
        <SidebarFilter {...sidebarProps} />
      </div>
    </aside>

    {show && (
      <div className="fixed inset-0 z-50 lg:hidden">
        <div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={onDismiss}
        />
        <div className={`absolute top-0 ${isAr ? "left-0" : "right-0"} bottom-0 w-80 bg-blue-50 overflow-y-auto p-4 shadow-2xl`}>
          <SidebarFilter {...sidebarProps} onClose={onDismiss} />
        </div>
      </div>
    )}
  </>
);

// ── Filter chip ───────────────────────────────────────────
const CHIP_COLORS = {
  blue:   "bg-blue-100 text-blue-700",
  indigo: "bg-indigo-100 text-indigo-700",
  sky:    "bg-sky-100 text-sky-700",
  amber:  "bg-amber-100 text-amber-700",
};
const Chip = ({
  label, onRemove, color = "blue",
}: { label: string; onRemove: () => void; color?: keyof typeof CHIP_COLORS }) => (
  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${CHIP_COLORS[color]}`}>
    {label}
    <button onClick={onRemove} className="hover:opacity-60 transition-opacity"><X size={11} /></button>
  </span>
);

// ── Main page ─────────────────────────────────────────────
const CatalogPage = () => {
  const { isAr } = useLang();
  const [wishlist, setWishlist] = useState<number[]>([]);

  const {
    filters, updateFilter, clearFilters, activeCount,
    products, totalProducts,
    categories,
    isLoading, isError,
    page, setPage, totalPages,
    showMobileFilter, setShowMobileFilter,
  } = useCatalog();

  const toggleWishlist = (id: number) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        <CatalogHeader
          totalProducts={totalProducts}
          sortBy={filters.sortBy}
          onSortChange={(v) => updateFilter("sortBy", v)}
          onMobileFilter={() => setShowMobileFilter(true)}
          activeFilterCount={activeCount}
        />

        <div className="flex gap-6">

          {/* Sidebar + Drawer — props flow directly, no intermediate interface */}
          <FilterPanel
            isAr={isAr}
            show={showMobileFilter}
            onDismiss={() => setShowMobileFilter(false)}
            filters={filters}
            categories={categories}
            activeCount={activeCount}
            onUpdate={updateFilter}
            onClear={clearFilters}
          />

          <section className="flex-1 min-w-0">

            {/* Active chips */}
            {activeCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.search && (
                  <Chip label={`🔍 ${filters.search}`} onRemove={() => updateFilter("search", "")} />
                )}
                {filters.mainCategory && (
                  <Chip label={filters.mainCategory} onRemove={() => {
                    updateFilter("mainCategory", "");
                    updateFilter("subCategory",  "");
                    updateFilter("childCategory","");
                  }} />
                )}
                {filters.subCategory && (
                  <Chip label={filters.subCategory} color="indigo" onRemove={() => {
                    updateFilter("subCategory",  "");
                    updateFilter("childCategory","");
                  }} />
                )}
                {filters.childCategory && (
                  <Chip label={filters.childCategory} color="sky"
                    onRemove={() => updateFilter("childCategory", "")} />
                )}
                {filters.rating > 0 && (
                  <Chip label={`★ ${filters.rating}+`} color="amber"
                    onRemove={() => updateFilter("rating", 0)} />
                )}
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-500 rounded-full text-xs font-semibold hover:bg-red-100 transition-all"
                >
                  <X size={11} /> {isAr ? "مسح الكل" : "Clear all"}
                </button>
              </div>
            )}

            {/* Error */}
            {isError && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="text-5xl mb-4">⚠️</span>
                <p className="text-slate-600 font-semibold mb-2">
                  {isAr ? "فشل تحميل المنتجات" : "Failed to load products"}
                </p>
                <p className="text-slate-400 text-sm">
                  {isAr ? "تأكد من تشغيل" : "Make sure"}{" "}
                  <code className="bg-slate-100 px-2 py-0.5 rounded text-blue-600">npm run server</code>
                </p>
              </div>
            )}

            {/* Empty */}
            {!isLoading && !isError && products.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="text-6xl mb-4">🔍</span>
                <p className="text-slate-700 font-bold text-lg mb-1">
                  {isAr ? "لا توجد نتائج" : "No products found"}
                </p>
                <p className="text-slate-400 text-sm mb-6">
                  {isAr ? "جرّب تغيير معايير البحث" : "Try adjusting your filters"}
                </p>
                <button onClick={clearFilters}
                  className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all">
                  {isAr ? "مسح الفلاتر" : "Clear filters"}
                </button>
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {isLoading
                ? Array.from({ length: 8 }).map((_, i) => <CatalogSkeleton key={i} />)
                : products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      categories={categories}
                      inWishlist={wishlist.includes(product.id)}
                      onWishlist={toggleWishlist}
                    />
                  ))
              }
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPage={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;