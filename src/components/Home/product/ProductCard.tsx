import { Heart, ShoppingCart } from "lucide-react";
import { useLang } from "../../../store/hooks";
import Stars from "../bestSeller/Stars";
import type { Category, Product } from "../../../types";
import { badgeStyles } from "../../../pages/login/constants";


interface ProductCardProps {
  product:    Product;
  categories: Category[];
  inWishlist: boolean;
  onWishlist: (id: number) => void;
}

const ProductCard = ({ product: p, categories, inWishlist, onWishlist }: ProductCardProps) => {
  const { isAr, t } = useLang();

  const categoryNameAr = categories.find((c) => c.name === p.category)?.nameAr;

  return (
    <div className="bg-white rounded-2xl border border-blue-100 overflow-hidden hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-100 hover:border-blue-300 transition-all duration-200 cursor-pointer">

      {/* ── Image ── */}
      <div className="relative h-44 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center text-6xl">
        {p.badge && (
          <span className={`absolute top-2.5 start-2.5 px-2.5 py-0.5 rounded-full text-white text-xs font-extrabold uppercase tracking-wide ${badgeStyles[p.badge]}`}>
            {t(p.badge.toLowerCase())}
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onWishlist(p.id); }}
          className={`absolute top-2.5 end-2.5 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center transition-all hover:scale-110 border border-blue-50
            ${inWishlist ? "text-red-500" : "text-slate-400"}`}
        >
          <Heart size={14} fill={inWishlist ? "#EF4444" : "none"} />
        </button>
        {p.image}
      </div>

      {/* ── Info ── */}
      <div className="p-4">
        <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-1">
          {isAr ? categoryNameAr : p.category}
        </p>
        <p className="text-sm font-bold text-slate-900 mb-2 leading-snug">
          {isAr ? p.nameAr : p.name}
        </p>
        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={p.rating} />
          <span className="text-xs text-slate-400">
            {p.rating} ({p.reviews.toLocaleString()})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-black text-blue-600">${p.price}</span>
          <button
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-600 hover:text-white hover:shadow-md hover:shadow-blue-300 transition-all"
            style={{ fontFamily: "inherit" }}
          >
            <ShoppingCart size={12} />
            {t("addToCart")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;