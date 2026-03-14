import axiosInstance from "../Axios";
import type { Category, Product } from "../types";

export const getProducts = async (): Promise<Product[]> => {
  const res = await axiosInstance.get("/products");
  return res.data;
};

export const getBestSellers = async (): Promise<Product[]> => {
  const res = await axiosInstance.get("/products?isBestSeller=true");
  return res.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const res = await axiosInstance.get("/categories");
  return res.data;
};

export const getProductById   = async (id: number): Promise<Product> =>
  (await axiosInstance.get(`/products/${id}`)).data;