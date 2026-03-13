import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useBestSellers } from "../../../hooks/useBestSellers";
import { useCategories }  from "../../../hooks/useCategories";
import BestSellerHeader   from "./BestSellerHeader";
import BestSellerFilters  from "./BestSellerFilters";
import ProductCard        from "../product/ProductCard";
import BestSellerSkeleton from "../../../skeletons/BestSellerSkeleton";

const BestSeller = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist]             = useState<number[]>([]);

  const { data: products,   isLoading: loadingProducts,   isError: errorProducts,   refetch } = useBestSellers();
  const { data: categories, isLoading: loadingCategories                                     } = useCategories();

  const isLoading = loadingProducts || loadingCategories;

  const toggleWishlist = (id: number) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const filtered = !products ? [] :
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  //   Error  
  if (errorProducts) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-5xl mb-4">⚠️</span>
        <p className="text-slate-600 font-semibold mb-2">Failed to load products</p>
        <p className="text-slate-400 text-sm mb-6">
          Make sure
          <code className="bg-slate-100 px-2 py-0.5 rounded text-blue-600">
            npm run server
          </code>
          is running
        </p>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all"
        >
          <RefreshCw size={14} /> Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">

      {/* ── Header ── */}
      <BestSellerHeader />

      {/* ── Filters ── */}
      {!loadingCategories && categories && (
        <BestSellerFilters
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      )}

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <BestSellerSkeleton key={i} />)
          : filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                categories={categories ?? []}
                inWishlist={wishlist.includes(p.id)}
                onWishlist={toggleWishlist}
              />
            ))
        }
      </div>
    </div>
  );
};

export default BestSeller;