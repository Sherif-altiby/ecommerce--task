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
  id:             number;
  name:           string;
  nameAr:         string;
  description:    string;
  descriptionAr:  string;
  price:          number;
  originalPrice:  number;
  rating:         number;
  reviews:        number;
  category:       string;
  categoryId:     number;
  subCategoryId:  number;
  childCategoryId:number;
  image:          string;        
  images:         string[];       
  badge:          string | null;
  sku:            string;
  availability:   string;
  availabilityAr: string;
  stock:          number;
  isBestSeller:   boolean;
  isNew:          boolean;
  tags:           string[];
  dataSheet:      string | null;
  video:          string | null;
  createdAt:      string;
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


export type TabKey = "description" | "datasheet" | "video";

export interface Tab {
  key:   TabKey;
  label: string;
  labelAr: string;
  icon:  string;
}

export const TABS: Tab[] = [
  { key: "description", label: "Description",  labelAr: "الوصف",        icon: "📄" },
  { key: "datasheet",   label: "Data Sheet",   labelAr: "صحيفة البيانات", icon: "📋" },
  { key: "video",       label: "Video",        labelAr: "الفيديو",       icon: "🎬" },
];

export const ROUTES = {
  HOME:           "/",
  PRODUCTS:       "/products",
  PRODUCT_DETAIL: (id: number | string) => `/products/${id}`,
  LOGIN:          "/login",
  ORDERS:         "/orders",
  CHECKOUT:       "/checkout",
} as const;

// src/pages/Checkout/checkout.types.ts

export interface CartItem {
  productId: number;
  name:      string;
  nameAr:    string;
  price:     number;
  quantity:  number;
  image:     string;
}

export interface ShippingAddress {
  fullName:  string;
  phone:     string;
  street:    string;
  city:      string;
  country:   string;
  zip:       string;
}

export type CheckoutStep = "summary" | "shipping" | "confirm" | "payment";

export const CHECKOUT_STEPS: { key: CheckoutStep; label: string; labelAr: string }[] = [
  { key: "summary",  label: "Cart",     labelAr: "السلة"       },
  { key: "shipping", label: "Shipping", labelAr: "الشحن"       },
  { key: "confirm",  label: "Confirm",  labelAr: "التأكيد"     },
  { key: "payment",  label: "Payment",  labelAr: "الدفع"       },
];

export const SHIPPING_COST = 5.99;
export const TAX_RATE      = 0.14;  

export type PayState = "idle" | "processing" | "success" | "failure";