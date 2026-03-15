import { useState, useMemo }      from "react";
import { useSearchParams }        from "react-router-dom";
import { DEFAULT_FILTERS }        from "../types";
import type { FilterState }       from "../types";
import { useProducts }            from "./useProducts";
import { useCategories }          from "./useCategories";

const ITEMS_PER_PAGE = 8;

export const useCatalog = () => {
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    mainCategory: searchParams.get("category") ?? "",
    search:       searchParams.get("search")   ?? "",   // ← read search from URL
  });

  const [page, setPage]                         = useState(1);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const { data: allProducts = [], isLoading: loadingProducts,  isError: errorProducts  } = useProducts();
  const { data: categories  = [], isLoading: loadingCategories                          } = useCategories();

  const filtered = useMemo(() => {
    let result = [...allProducts];

    // ── Resolve category objects ─────────────────────────
    const mainCat = filters.mainCategory
      ? categories.find((c) => c.name === filters.mainCategory) ?? null
      : null;

    const subCat = filters.subCategory && mainCat
      ? (mainCat.subCategories ?? []).find((s) => s.name === filters.subCategory) ?? null
      : null;

    const childCat = filters.childCategory && subCat
      ? (subCat.childCategories ?? []).find((ch) => ch.name === filters.childCategory) ?? null
      : null;

    // DEBUG — remove after confirming filter works
    if (filters.mainCategory) {
      console.log("[useCatalog] mainCategory:", filters.mainCategory);
      console.log("[useCatalog] categories loaded:", categories.length);
      console.log("[useCatalog] mainCat resolved:", mainCat);
      console.log("[useCatalog] products before filter:", result.length);
      console.log("[useCatalog] sample product categoryId:", result[0]?.categoryId, typeof result[0]?.categoryId);
    }

    // 1. Text search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q)               ||
          p.nameAr.includes(q)                           ||
          (p.description ?? "").toLowerCase().includes(q) ||
          (p.tags ?? []).some((t) => t.toLowerCase().includes(q))
      );
    }

    // 2. Main category — match by numeric categoryId
    if (filters.mainCategory) {
      if (mainCat) {
        result = result.filter((p) => Number(p.categoryId) === Number(mainCat.id));
      } else {
        // fallback while categories load
        result = result.filter((p) => p.category === filters.mainCategory);
      }
      console.log("[useCatalog] after category filter:", result.length);
    }

    // 3. Sub category
    if (filters.subCategory && subCat) {
      result = result.filter((p) => Number(p.subCategoryId) === Number(subCat.id));
      console.log("[useCatalog] after sub filter:", result.length);
    }

    // 4. Child category
    if (filters.childCategory && childCat) {
      result = result.filter((p) => Number(p.childCategoryId) === Number(childCat.id));
      console.log("[useCatalog] after child filter:", result.length);
    }

    // 5. Price range
    result = result.filter(
      (p) => p.price >= filters.priceMin && p.price <= filters.priceMax
    );

    // 6. Rating
    if (filters.rating > 0) {
      result = result.filter((p) => p.rating >= filters.rating);
    }

    // 7. Sort
    const out = [...result];
    switch (filters.sortBy) {
      case "price_asc":  out.sort((a, b) => a.price  - b.price);  break;
      case "price_desc": out.sort((a, b) => b.price  - a.price);  break;
      case "rating":     out.sort((a, b) => b.rating - a.rating); break;
      case "newest":
        out.sort((a, b) =>
          new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
        );
        break;
    }
    return out;
  }, [allProducts, categories, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const activeCount =
    [filters.search, filters.mainCategory, filters.subCategory, filters.childCategory]
      .filter(Boolean).length +
    (filters.rating > 0 ? 1 : 0) +
    (filters.priceMin > DEFAULT_FILTERS.priceMin ? 1 : 0) +
    (filters.priceMax < DEFAULT_FILTERS.priceMax ? 1 : 0);

  const updateFilter = (key: keyof FilterState, value: FilterState[keyof FilterState]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  return {
    filters, updateFilter, clearFilters, activeCount,
    products:      paginated,
    totalProducts: filtered.length,
    categories,
    isLoading: loadingProducts || loadingCategories,
    isError:   errorProducts,
    page, setPage, totalPages,
    showMobileFilter, setShowMobileFilter,
  };
};