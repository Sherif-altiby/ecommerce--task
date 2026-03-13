import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types";
import { getBestSellers, getProducts } from "../services/product";


// ── Query Keys ──
export const productKeys = {
  all:         ["products"]               as const,
  bestSellers: ["products", "bestSellers"] as const,
  detail:      (id: number) => ["products", id] as const,
};

// ── All products ──
export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey:  productKeys.all,
    queryFn:   getProducts,
    staleTime: 1000 * 60 * 5,   // 5 minutes
  });
};

// ── Best sellers only ──
export const useBestSellers = () => {
  return useQuery<Product[]>({
    queryKey:  productKeys.bestSellers,
    queryFn:   getBestSellers,
    staleTime: 1000 * 60 * 5,
  });
};

// ── Both products + categories together ──
export const useProductsAndCategories = () => {
  const products   = useProducts();
  const categories = useQuery({
    queryKey: ["categories"],
    staleTime: 1000 * 60 * 10,
  });

  return {
    products:   products.data   ?? [],
    categories: categories.data ?? [],
    isLoading:  products.isLoading  || categories.isLoading,
    isError:    products.isError    || categories.isError,
    isSuccess:  products.isSuccess  && categories.isSuccess,
    error:      products.error      ?? categories.error,
    refetch: () => {
      products.refetch();
      categories.refetch();
    },
  };
};