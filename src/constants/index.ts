import { ROUTES } from "../types";

export const DUMMY_USERS = [
  {
    email: "ahmed@example.com",
    password: "password123",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummytoken1",
    name: "Ahmed Hassan",
  },
  {
    email: "sara@example.com",
    password: "password123",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummytoken2",
    name: "Sara Mohamed",
  },
];

export const badgeStyles: Record<string, string> = {
  Hot: "bg-red-500",
  Sale: "bg-emerald-500",
  New: "bg-violet-500",
};

export const stats = [
  { num: "1M+", labelKey: "statProducts" },
  { num: "50K+", labelKey: "statSellers" },
  { num: "4.8★", labelKey: "statRating" },
  { num: "Free", labelKey: "statReturns" },
];

export const LINKS = {
  shop: [
    { label: "All Products", labelAr: "كل المنتجات", to: ROUTES.PRODUCTS },
    {
      label: "Electronics",
      labelAr: "إلكترونيات",
      to: `${ROUTES.PRODUCTS}?category=Electronics`,
    },
    {
      label: "Fashion",
      labelAr: "أزياء",
      to: `${ROUTES.PRODUCTS}?category=Fashion`,
    },
    {
      label: "Home & Living",
      labelAr: "المنزل والمعيشة",
      to: `${ROUTES.PRODUCTS}?category=Home+%26+Living`,
    },
    {
      label: "Sports",
      labelAr: "رياضة",
      to: `${ROUTES.PRODUCTS}?category=Sports`,
    },
    {
      label: "Beauty",
      labelAr: "جمال",
      to: `${ROUTES.PRODUCTS}?category=Beauty`,
    },
  ],
  account: [
    { label: "Sign In", labelAr: "تسجيل الدخول", to: ROUTES.LOGIN },
    { label: "My Orders", labelAr: "طلباتي", to: ROUTES.ORDERS },
    { label: "Checkout", labelAr: "الدفع", to: ROUTES.CHECKOUT },
    { label: "Wishlist", labelAr: "المفضلة", to: "#" },
  ],
  support: [
    { label: "Help Center", labelAr: "مركز المساعدة", to: "#" },
    { label: "Track Order", labelAr: "تتبع الطلب", to: "#" },
    { label: "Return Policy", labelAr: "سياسة الإرجاع", to: "#" },
    { label: "Privacy Policy", labelAr: "سياسة الخصوصية", to: "#" },
  ],
};

export const suggestions = [
  { en: "Wireless Headphones", ar: "سماعات لاسلكية" },
  { en: "Running Shoes", ar: "حذاء ركض" },
  { en: "Coffee Maker", ar: "ماكينة قهوة" },
  { en: "Leather Jacket", ar: "جاكيت جلد" },
  { en: "Yoga Mat", ar: "مات يوغا" },
];

export const stepTitles: Record<string, { en: string; ar: string }> = {
  summary: { en: "Your Cart", ar: "سلة التسوق" },
  shipping: { en: "Shipping Details", ar: "تفاصيل الشحن" },
  confirm: { en: "Review Order", ar: "مراجعة الطلب" },
  payment: { en: "Secure Payment", ar: "الدفع الآمن" },
};
