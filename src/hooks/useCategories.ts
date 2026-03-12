import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/category";

export const queryKeys = {
  categories: ["categories"] as const,
};

export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn:  getCategories,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};