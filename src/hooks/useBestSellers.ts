import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types";
import { getBestSellers } from "../services/product";


export const useBestSellers = () => {
  return useQuery<Product[]>({
    queryKey:  ["bestSellers"],
    queryFn:   getBestSellers,
    staleTime: 1000 * 60 * 5,
  });
};