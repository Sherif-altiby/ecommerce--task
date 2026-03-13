import { useState, useMemo } from "react";
import { DEFAULT_FILTERS, type FilterState } from "../types";
import { useCategories } from "./useCategories";
import { useProducts } from "./useProducts";


const ITEMS_PER_PAGE = 8;

export const useCatalog = () => {
  const [filters, setFilters]   = useState<FilterState>(DEFAULT_FILTERS);
  const [page, setPage]         = useState(1);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const { data: products   = [], isLoading: loadingProducts,  isError: errorProducts  } = useProducts();
  const { data: categories = [], isLoading: loadingCategories                          } = useCategories();

  const filtered = useMemo(() => {
    let result = [...products];

    // Text search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.nameAr.includes(q)
      );
    }

    // Category filter
    if (filters.mainCategory) {
      result = result.filter((p) => p.category === filters.mainCategory);
    }

    // Price range
    result = result.filter(
      (p) => p.price >= filters.priceMin && p.price <= filters.priceMax
    );

    // Rating
    if (filters.rating > 0) {
      result = result.filter((p) => p.rating >= filters.rating);
    }

    // Sort
    switch (filters.sortBy) {
      case "price_asc":  result.sort((a, b) => a.price  - b.price);  break;
      case "price_desc": result.sort((a, b) => b.price  - a.price);  break;
      case "rating":     result.sort((a, b) => b.rating - a.rating); break;
      case "newest":
        result.sort((a, b) =>
          new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
        );
        break;
    }

    return result;
  }, [products, filters]);

  // ── Pagination ─────────────────────────────────────────
  const totalPages  = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated   = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const activeCount = Object.entries(filters).filter(([k, v]) =>
    k !== "sortBy" && k !== "priceMax" && v !== "" && v !== 0 && v !== DEFAULT_FILTERS.priceMin
  ).length;

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  return {
    filters, updateFilter, clearFilters, activeCount,
    products: paginated,
    totalProducts: filtered.length,
    categories,
    isLoading: loadingProducts || loadingCategories,
    isError: errorProducts,
    page, setPage, totalPages,
    showMobileFilter, setShowMobileFilter,
  };
};