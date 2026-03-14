import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { SHIPPING_COST, TAX_RATE, type CartItem } from "../../types";
import { useAppDispatch, useLang } from "../../store/hooks";
import { removeItem, updateQty } from "../../store/cartSclice";
import Button from "../buttons/Button";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  onNext: () => void;
}

const OrderSummary = ({
  items,
  subtotal,
  tax,
  total,
  onNext,
}: OrderSummaryProps) => {
  const { t, isAr } = useLang();
  const dispatch = useAppDispatch();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <ShoppingBag size={56} className="text-blue-200" />
        <p className="text-slate-700 font-bold text-lg">
          {t("checkout.emptyCart")}
        </p>
        <p className="text-slate-400 text-sm">{t("checkout.emptyCartHint")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ── Item list ── */}
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-blue-100 hover:border-blue-200 transition-all"
          >
            {/* Emoji image */}
            <div className="w-14 h-14 rounded-xl bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center text-3xl shrink-0">
              {item.image}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">
                {isAr ? item.nameAr : item.name}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                ${item.price.toFixed(2)} {t("checkout.perEach")}
              </p>
            </div>

            {/* Quantity stepper */}
            <div className="flex items-center gap-1 border border-blue-100 rounded-xl overflow-hidden">
              <button
                onClick={() =>
                  item.quantity === 1
                    ? dispatch(removeItem(item.productId))
                    : dispatch(
                        updateQty({
                          productId: item.productId,
                          quantity: item.quantity - 1,
                        }),
                      )
                }
                className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all"
              >
                {item.quantity === 1 ? (
                  <Trash2 size={12} className="text-red-400" />
                ) : (
                  <Minus size={12} />
                )}
              </button>
              <span className="w-8 text-center text-sm font-extrabold text-slate-700">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  dispatch(
                    updateQty({
                      productId: item.productId,
                      quantity: item.quantity + 1,
                    }),
                  )
                }
                className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all"
              >
                <Plus size={12} />
              </button>
            </div>

            {/* Line total */}
            <p className="text-sm font-black text-blue-600 w-16 text-end shrink-0">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* ── Price breakdown ── */}
      <div className="bg-white rounded-2xl border border-blue-100 p-5 flex flex-col gap-3">
        <div className="flex justify-between text-sm text-slate-600">
          <span>{t("checkout.subtotal")}</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-600">
          <span>
            {isAr
              ? `ضريبة القيمة المضافة (${TAX_RATE * 100}%)`
              : `VAT (${TAX_RATE * 100}%)`}
          </span>
          <span className="font-semibold">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-600">
          <span>{t("checkout.shipping")}</span>
          <span className="font-semibold">${SHIPPING_COST.toFixed(2)}</span>
        </div>
        <div className="h-px bg-blue-100" />
        <div className="flex justify-between text-base font-black text-slate-900">
          <span>{t("checkout.total")}</span>
          <span className="text-blue-600">${total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        onClick={onNext}
        variant="primary"
        size="xl"
        fullWidth
        rightIcon={<ArrowRight size={16} />}
      >
        {t("checkout.continueToShipping")}
      </Button>
    </div>
  );
};

export default OrderSummary;
