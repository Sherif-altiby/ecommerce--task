import { Heart, ShoppingCart, Star, X } from "lucide-react";
import { useState } from "react";
import { useCatalog } from "../hooks/useCatalog";
import { useLang } from "../store/hooks";
import CatalogHeader from "../components/catalog/CatalogHeader";
import SidebarFilter from "../components/catalog/SidebarFilter";
import Pagination from "../components/catalog/Pagination";
import CatalogSkeleton from "../skeletons/CatalogSkeleton";
import { badgeStyles } from "./login/constants";



// ── Stars ──
const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={11}
        fill={i < Math.floor(rating) ? "#F59E0B" : "none"}
        stroke={i < Math.floor(rating) ? "#F59E0B" : "#CBD5E1"}
      />
    ))}
  </div>
);


// ── Main Page ──────────────────────────────────────────────
const CatalogPage = () => {
  const { isAr, t } = useLang();
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
    <div
      className="min-h-screen bg-blue-50"
      
    >


      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Page Header ── */}
        <CatalogHeader
          totalProducts={totalProducts}
          sortBy={filters.sortBy}
          onSortChange={(v) => updateFilter("sortBy", v)}
          onMobileFilter={() => setShowMobileFilter(true)}
          activeFilterCount={activeCount}
        />

        <div className="flex gap-6">

          {/* ── SIDEBAR — Desktop ── */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <SidebarFilter
                filters={filters}
                categories={categories}
                activeCount={activeCount}
                onUpdate={updateFilter}
                onClear={clearFilters}
              />
            </div>
          </aside>

          {/* ── MOBILE FILTER DRAWER ── */}
          {showMobileFilter && (
            <div className="fixed inset-0 z-50 lg:hidden">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={() => setShowMobileFilter(false)}
              />
              {/* Drawer */}
              <div className={`absolute top-0 ${isAr ? "left-0" : "right-0"} bottom-0 w-80 bg-blue-50 overflow-y-auto p-4 shadow-2xl`}>
                <SidebarFilter
                  filters={filters}
                  categories={categories}
                  activeCount={activeCount}
                  onUpdate={updateFilter}
                  onClear={clearFilters}
                  onClose={() => setShowMobileFilter(false)}
                />
              </div>
            </div>
          )}

          {/* ── MAIN CONTENT ── */}
          <section className="flex-1 min-w-0">

            {/* Active filter chips */}
            {activeCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.search && (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    🔍 {filters.search}
                    <button onClick={() => updateFilter("search", "")}><X size={11} /></button>
                  </span>
                )}
                {filters.mainCategory && (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {filters.mainCategory}
                    <button onClick={() => { updateFilter("mainCategory", ""); updateFilter("subCategory", ""); updateFilter("childCategory", ""); }}>
                      <X size={11} />
                    </button>
                  </span>
                )}
                {filters.rating > 0 && (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                    ★ {filters.rating}+
                    <button onClick={() => updateFilter("rating", 0)}><X size={11} /></button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-500 rounded-full text-xs font-semibold hover:bg-red-100 transition-all"
                >
                  <X size={11} />
                  {isAr ? "مسح الكل" : "Clear all"}
                </button>
              </div>
            )}

            {/* ── Error ── */}
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

            {/* ── Empty state ── */}
            {!isLoading && !isError && products.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="text-6xl mb-4">🔍</span>
                <p className="text-slate-700 font-bold text-lg mb-1">
                  {isAr ? "لا توجد نتائج" : "No products found"}
                </p>
                <p className="text-slate-400 text-sm mb-6">
                  {isAr ? "جرّب تغيير معايير البحث" : "Try adjusting your filters"}
                </p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all"
                >
                  {isAr ? "مسح الفلاتر" : "Clear filters"}
                </button>
              </div>
            )}

            {/* ── Products Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {isLoading
                ? Array.from({ length: 8 }).map((_, i) => <CatalogSkeleton key={i} />)
                : products.map((p) => {
                    const inWishlist    = wishlist.includes(p.id);
                    const categoryNameAr = categories.find((c) => c.name === p.category)?.nameAr;
                    return (
                      <div
                        key={p.id}
                        className="bg-white rounded-2xl border border-blue-100 overflow-hidden hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-100 hover:border-blue-300 transition-all duration-200 cursor-pointer group"
                      >
                        {/* Image */}
                        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center text-6xl overflow-hidden">
                          {p.badge && (
                            <span className={`absolute top-2.5 start-2.5 px-2.5 py-0.5 rounded-full text-white text-xs font-extrabold uppercase tracking-wide ${badgeStyles[p.badge]}`}>
                              {t(p.badge.toLowerCase())}
                            </span>
                          )}
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
                            className={`absolute top-2.5 end-2.5 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center transition-all hover:scale-110 border border-blue-50
                              ${inWishlist ? "text-red-500" : "text-slate-300"}`}
                          >
                            <Heart size={14} fill={inWishlist ? "#EF4444" : "none"} />
                          </button>

                          {/* Availability badge */}
                          {p.stock < 10 && p.stock > 0 && (
                            <span className="absolute bottom-2.5 start-2.5 px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-lg">
                              {isAr ? `${p.stock} فقط` : `Only ${p.stock} left`}
                            </span>
                          )}

                          <span className="group-hover:scale-110 transition-transform duration-300 inline-block">
                            {p.image}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="p-4">
                          <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-1">
                            {isAr ? categoryNameAr : p.category}
                          </p>
                          <p className="text-sm font-bold text-slate-900 mb-1 leading-snug">
                            {isAr ? p.nameAr : p.name}
                          </p>
                          <p className="text-xs text-slate-400 mb-2 font-medium">
                            SKU: {p.sku}
                          </p>
                          <div className="flex items-center gap-1.5 mb-3">
                            <Stars rating={p.rating} />
                            <span className="text-xs text-slate-400">
                              {p.rating} ({p.reviews.toLocaleString()})
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-lg font-black text-blue-600">${p.price}</span>
                              {p.originalPrice > p.price && (
                                <span className="text-xs text-slate-400 line-through ms-1.5">
                                  ${p.originalPrice}
                                </span>
                              )}
                            </div>
                            <button
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-600 hover:text-white hover:shadow-md hover:shadow-blue-300 transition-all"
                              style={{ fontFamily: "inherit" }}
                            >
                              <ShoppingCart size={12} />
                              {t("addToCart")}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>

            {/*   Pagination   */}
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