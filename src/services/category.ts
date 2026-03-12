import axiosInstance from "../Axios";
import type { Category } from "../types";

export const getCategories = async (): Promise<Category[]> => {
  const res = await axiosInstance.get("/categories");
  return res.data;
};