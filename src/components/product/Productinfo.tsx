import { ShoppingCart, CheckCircle, Star, Minus, Plus, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addItem } from "../../store/cartSclice";
import type { Product } from "../../types";
import { useLang } from "../../store/hooks";

interface ProductInfoProps {
  product: Product;
  qty: number;
  onInc: () => void;
  onDec: () => void;
}

const ProductInfo = ({ product: p, qty, onInc, onDec }: ProductInfoProps) => {
  const { isAr, t } = useLang();
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);

  const discount =
    p.originalPrice > p.price
      ? Math.round((1 - p.price / p.originalPrice) * 100)
      : 0;

  const inStock = p.stock > 0;

  const handleAddToCart = () => {
    if (!inStock) return;

    dispatch(
      addItem({
        productId: p.id,
        name: p.name,
        nameAr: p.nameAr,
        price: p.price,
        quantity: qty,
        image: p.image,
      })
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-7">

      {/* CATEGORY */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest">
          {p.category}
        </span>

        {p.isNew && (
          <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-blue-600 text-white uppercase">
            NEW
          </span>
        )}

        {p.badge === "Hot" && (
          <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-red-500 text-white uppercase">
            HOT
          </span>
        )}
      </div>

      {/* PRODUCT NAME */}
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
        {isAr ? p.nameAr : p.name}
      </h1>

      {/* RATING */}
      <div className="flex items-center gap-2">
        <div className="flex">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < Math.floor(p.rating) ? "#FBBF24" : "none"}
              stroke={i < Math.floor(p.rating) ? "#FBBF24" : "#E5E7EB"}
            />
          ))}
        </div>

        <span className="text-sm font-bold text-slate-800">
          {p.rating}
        </span>

        <span className="text-sm text-slate-400">
          ({p.reviews} {isAr ? "تقييم" : "reviews"})
        </span>
      </div>

      {/* PRICE CARD */}
      <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between">

          <div className="flex items-end gap-3">
            <span className="text-4xl font-black text-slate-900">
              ${p.price}
            </span>

            {p.originalPrice > p.price && (
              <span className="text-lg line-through text-slate-400">
                ${p.originalPrice}
              </span>
            )}
          </div>

          {discount > 0 && (
            <div className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm font-bold">
              -{discount}%
            </div>
          )}
        </div>

        <p className="mt-3 text-xs text-slate-500 font-mono">
          SKU: {p.sku}
        </p>

        <p className="text-xs mt-1">
          {inStock ? (
            <span className="text-emerald-500 font-bold">
              {isAr ? p.availabilityAr : p.availability}
            </span>
          ) : (
            <span className="text-red-500 font-bold">
              {isAr ? "غير متوفر" : "Out of Stock"}
            </span>
          )}
        </p>
      </div>

      {/* QUANTITY */}
      <div className="flex items-center justify-between">

        <p className="text-sm font-semibold text-slate-600">
          {isAr ? "الكمية" : "Quantity"}
        </p>

        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">

          <button
            onClick={onDec}
            disabled={qty <= 1}
            className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-30"
          >
            <Minus size={14} />
          </button>

          <span className="w-12 text-center font-bold text-slate-900">
            {qty}
          </span>

          <button
            onClick={onInc}
            disabled={qty >= p.stock}
            className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-30"
          >
            <Plus size={14} />
          </button>

        </div>
      </div>

      {/* ADD TO CART */}
      <button
        onClick={handleAddToCart}
        disabled={!inStock}
        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all
        ${
          added
            ? "bg-emerald-500 text-white"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {added ? (
          <>
            <CheckCircle size={16} />
            {t("productDetail.addToCart")}
          </>
        ) : (
          <>
            <ShoppingCart size={16} />
            {t("productDetail.addToCart")}
          </>
        )}
      </button>

      {/* TRUST BADGES */}
      <div className="grid grid-cols-3 gap-3 pt-2">

        <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <ShieldCheck size={16} className="text-blue-500" />
          <p className="text-[11px] font-semibold text-slate-500 text-center">
            {isAr ? "دفع آمن" : "Secure Payment"}
          </p>
        </div>

        <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <Truck size={16} className="text-blue-500" />
          <p className="text-[11px] font-semibold text-slate-500 text-center">
            {isAr ? "شحن مجاني" : "Free Shipping"}
          </p>
        </div>

        <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <RotateCcw size={16} className="text-blue-500" />
          <p className="text-[11px] font-semibold text-slate-500 text-center">
            {isAr ? "إرجاع 30 يوم" : "30-Day Returns"}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProductInfo;