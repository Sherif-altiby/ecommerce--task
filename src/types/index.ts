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