// src/components/BestSeller/BestSeller.tsx
import { useState }          from "react";
import BestSellerHeader      from "./BestSellerHeader";
import BestSellerFilters     from "./BestSellerFilters";
import ProductCard           from "../product/ProductCard";
import EmptyState            from "./EmptyState";
import { useCategories }     from "../../hooks/useCategories";
import { useBestSellers }    from "../../hooks/useBestSellers";
import BestSellerSkeleton    from "../../skeletons/BestSellerSkeleton";
import { useLang }           from "../../store/hooks";
import ErrorState from "../../errorState/ErrorState";

const BestSeller = () => {
  const { isAr }                            = useLang();
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist]             = useState<number[]>([]);

  const { data: products,   isLoading: loadingProducts,  isError: errorProducts,  refetch } = useBestSellers();
  const { data: categories, isLoading: loadingCategories                                   } = useCategories();

  const isLoading = loadingProducts || loadingCategories;

  const toggleWishlist = (id: number) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const filtered = !products
    ? []
    : activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">

      <BestSellerHeader />

      {!loadingCategories && categories && (
        <BestSellerFilters
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => <BestSellerSkeleton key={i} />)

        ) : errorProducts ? (
          <ErrorState
            type="server"
            message={isAr ? "فشل تحميل المنتجات" : "Failed to load products"}
            onRetry={refetch}
          />

        ) : filtered.length === 0 ? (
          <EmptyState
            activeCategory={activeCategory}
            onReset={() => setActiveCategory("All")}
          />

        ) : (
          filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              categories={categories ?? []}
              inWishlist={wishlist.includes(p.id)}
              onWishlist={toggleWishlist}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BestSeller;