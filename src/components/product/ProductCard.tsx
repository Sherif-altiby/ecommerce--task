import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useLang } from "../../store/hooks";
import Stars from "../bestSeller/Stars";
import { ROUTES, type Category, type Product } from "../../types";
import { badgeStyles } from "../../constants";
import { addItem } from "../../store/cartSclice";
import Button from "../buttons/Button";

interface ProductCardProps {
  product: Product;
  categories: Category[];
  inWishlist: boolean;
  onWishlist: (id: number) => void;
}

const ProductCard = ({
  product: p,
  categories,
  inWishlist,
  onWishlist,
}: ProductCardProps) => {
  const { isAr, t } = useLang();

  const categoryNameAr = categories.find((c) => c.name === p.category)?.nameAr;

  const dispatch = useAppDispatch();

  return (
    <Link
      to={ROUTES.PRODUCT_DETAIL(p.id)}
      className="bg-white rounded-2xl border border-blue-100 overflow-hidden hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-100 hover:border-blue-300 transition-all duration-200 cursor-pointer block"
    >
      {/* ── Image ── */}
      <div className="relative h-44 bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center text-6xl">
        {p.badge && (
          <span
            className={`absolute top-2.5 inset-s-2.5 px-2.5 py-0.5 rounded-full text-white text-xs font-extrabold uppercase tracking-wide ${badgeStyles[p.badge]}`}
          >
            {t(p.badge.toLowerCase())}
          </span>
        )}
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
          <Button
            variant="soft"
            size="sm"
            leftIcon={<ShoppingCart size={12} />}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(
                addItem({
                  productId: p.id,
                  name: p.name,
                  nameAr: p.nameAr,
                  price: p.price,
                  quantity: 1,
                  image: p.image,
                }),
              );
            }}
          >
            {t("addToCart")}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
