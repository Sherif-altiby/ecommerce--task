export type Language = "en" | "ar";

export interface ChildCategory {
  id:     number;
  name:   string;
  nameAr: string;
}

export interface SubCategory {
  id:               number;
  name:             string;
  nameAr:           string;
  childCategories:  ChildCategory[];
}

export interface Category {
  id:             number;
  name:           string;
  nameAr:         string;
  icon:           string;
  image:          string;
  productCount:   number;
  subCategories:  SubCategory[];
}

export interface Product {
  id:           number;
  name:         string;
  nameAr:       string;
  description:  string;
  descriptionAr:string;
  price:        number;
  originalPrice:number;
  rating:       number;
  reviews:      number;
  category:     string;
  categoryId:   number;
  image:        string;
  badge:        string | null;
  sku:          string;
  availability: string;
  availabilityAr:string;
  stock:        number;
  isBestSeller: boolean;
  isNew:        boolean;
  createdAt:     string;  
}

export interface FilterState {
  search:          string;
  mainCategory:    string;
  subCategory:     string;
  childCategory:   string;
  priceMin:        number;
  priceMax:        number;
  rating:          number;
  sortBy:          "newest" | "price_asc" | "price_desc" | "rating";
}

export const DEFAULT_FILTERS: FilterState = {
  search:        "",
  mainCategory:  "",
  subCategory:   "",
  childCategory: "",
  priceMin:      0,
  priceMax:      1000,
  rating:        0,
  sortBy:        "newest",
};