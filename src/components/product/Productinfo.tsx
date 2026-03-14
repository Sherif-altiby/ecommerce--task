// src/pages/ProductDetail/components/ProductInfo.tsx

import { ShoppingCart, Heart, Share2, Package, Tag, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import type { Product } from "../../types";
import { useLang } from "../../store/hooks";
import Stars from "../bestSeller/Stars";

interface ProductInfoProps {
  product:   Product;
  qty:       number;
  onInc:     () => void;
  onDec:     () => void;
}

const ProductInfo = ({ product: p, qty, onInc, onDec }: ProductInfoProps) => {
  const { isAr, t } = useLang();
  const [inWishlist, setInWishlist] = useState(false);
  const [added, setAdded]           = useState(false);

  const discount = p.originalPrice > p.price
    ? Math.round((1 - p.price / p.originalPrice) * 100)
    : 0;

  const inStock = p.stock > 0;

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5">

      {/* ── Category breadcrumb ── */}
      <p className="text-xs font-bold text-blue-500 uppercase tracking-widest">
        {isAr ? p.category : p.category}
      </p>

      {/* ── Name ── */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
        {isAr ? p.nameAr : p.name}
      </h1>

      {/* ── Rating row ── */}
      <div className="flex items-center gap-3">
        <Stars rating={p.rating} />
        <span className="text-sm font-semibold text-slate-700">{p.rating}</span>
        <span className="text-sm text-slate-400">({p.reviews.toLocaleString()} {isAr ? "تقييم" : "reviews"})</span>
      </div>

      {/* ── Price ── */}
      <div className="flex items-end gap-3">
        <span className="text-4xl font-black text-blue-600">${p.price}</span>
        {p.originalPrice > p.price && (
          <>
            <span className="text-lg text-slate-400 line-through mb-0.5">${p.originalPrice}</span>
            <span className="mb-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-extrabold">
              -{discount}%
            </span>
          </>
        )}
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-blue-100" />

      {/* ── Meta info ── */}
      <div className="grid grid-cols-2 gap-3">

        {/* Availability */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
          {inStock
            ? <CheckCircle size={16} className="text-emerald-500 shrink-0" />
            : <XCircle    size={16} className="text-red-400 shrink-0" />
          }
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">
              {isAr ? "التوفر" : "Availability"}
            </p>
            <p className={`text-sm font-bold ${inStock ? "text-emerald-600" : "text-red-500"}`}>
              {isAr ? p.availabilityAr : p.availability}
            </p>
          </div>
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <Package size={16} className="text-blue-400 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">
              {isAr ? "المخزون" : "In Stock"}
            </p>
            <p className={`text-sm font-bold ${p.stock < 10 ? "text-orange-500" : "text-slate-700"}`}>
              {p.stock < 10
                ? (isAr ? `${p.stock} فقط` : `Only ${p.stock} left`)
                : p.stock
              }
            </p>
          </div>
        </div>

        {/* SKU */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 col-span-2">
          <Tag size={16} className="text-indigo-400 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">
              {isAr ? "رمز المنتج" : "SKU / Product Code"}
            </p>
            <p className="text-sm font-mono font-bold text-slate-700">{p.sku}</p>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-blue-100" />

      {/* ── Quantity ── */}
      <div className="flex items-center gap-4">
        <p className="text-sm font-bold text-slate-600">{isAr ? "الكمية" : "Quantity"}</p>
        <div className="flex items-center border border-blue-200 rounded-xl overflow-hidden">
          <button
            onClick={onDec}
            disabled={qty <= 1}
            className="w-10 h-10 flex items-center justify-center text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-lg"
          >
            −
          </button>
          <span className="w-12 text-center font-extrabold text-slate-800 text-sm">
            {qty}
          </span>
          <button
            onClick={onInc}
            disabled={qty >= p.stock}
            className="w-10 h-10 flex items-center justify-center text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* ── CTA Buttons ── */}
      <div className="flex gap-3">

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed
            ${added
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
              : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95"
            }`}
          style={{ fontFamily: "inherit" }}
        >
          <ShoppingCart size={16} />
          {added
            ? (isAr ? "✓ أضيف!" : "✓ Added!")
            : t("addToCart")}
        </button>

        {/* Wishlist */}
        <button
          onClick={() => setInWishlist((v) => !v)}
          className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all hover:scale-110
            ${inWishlist
              ? "border-red-200 bg-red-50 text-red-500"
              : "border-blue-100 bg-white text-slate-400 hover:border-red-200 hover:text-red-400"
            }`}
        >
          <Heart size={16} fill={inWishlist ? "#EF4444" : "none"} />
        </button>

        {/* Share */}
        <button
          className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-blue-100 bg-white text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-all hover:scale-110"
          onClick={() => navigator.share?.({ title: p.name, url: window.location.href })}
        >
          <Share2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;