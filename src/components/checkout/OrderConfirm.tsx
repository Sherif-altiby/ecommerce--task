import { MapPin, Package, CreditCard, ArrowLeft, Loader2 } from "lucide-react";
import { SHIPPING_COST, TAX_RATE, type CartItem, type ShippingAddress } from "../../types";
import { useLang } from "../../store/hooks";


interface OrderConfirmProps {
  items:         CartItem[];
  shipping:      ShippingAddress;
  subtotal:      number;
  tax:           number;
  total:         number;
  isProcessing:  boolean;
  onBack:        () => void;
  onPlaceOrder:  () => void;
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4 py-2 border-b border-slate-50 last:border-0">
    <span className="text-xs text-slate-400 font-medium shrink-0">{label}</span>
    <span className="text-xs font-semibold text-slate-700 text-end">{value}</span>
  </div>
);

const OrderConfirm = ({
  items, shipping, subtotal, tax, total,
  isProcessing, onBack, onPlaceOrder,
}: OrderConfirmProps) => {
  const { isAr } = useLang();

  return (
    <div className="flex flex-col gap-6">

      {/* ── Items summary ── */}
      <div className="bg-white rounded-2xl border border-blue-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Package size={16} className="text-blue-500" />
          <h3 className="text-sm font-extrabold text-slate-800">
            {isAr ? "المنتجات" : "Items"} ({items.length})
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{item.image}</span>
                <div>
                  <p className="text-xs font-semibold text-slate-700 line-clamp-1">
                    {isAr ? item.nameAr : item.name}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-blue-600 shrink-0">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Shipping address ── */}
      <div className="bg-white rounded-2xl border border-blue-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={16} className="text-blue-500" />
          <h3 className="text-sm font-extrabold text-slate-800">
            {isAr ? "عنوان الشحن" : "Shipping Address"}
          </h3>
        </div>
        <Row label={isAr ? "الاسم" : "Name"}    value={shipping.fullName} />
        <Row label={isAr ? "الهاتف" : "Phone"}  value={shipping.phone} />
        <Row label={isAr ? "الشارع" : "Street"} value={shipping.street} />
        <Row label={isAr ? "المدينة" : "City"}  value={`${shipping.city}, ${shipping.zip}`} />
        <Row label={isAr ? "الدولة" : "Country"} value={shipping.country} />
      </div>

      {/* ── Price breakdown ── */}
      <div className="bg-white rounded-2xl border border-blue-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard size={16} className="text-blue-500" />
          <h3 className="text-sm font-extrabold text-slate-800">
            {isAr ? "ملخص الدفع" : "Payment Summary"}
          </h3>
        </div>
        <Row label={isAr ? "المجموع الفرعي" : "Subtotal"} value={`$${subtotal.toFixed(2)}`} />
        <Row label={isAr ? `ضريبة (${TAX_RATE * 100}%)` : `VAT (${TAX_RATE * 100}%)`} value={`$${tax.toFixed(2)}`} />
        <Row label={isAr ? "الشحن" : "Shipping"} value={`$${SHIPPING_COST.toFixed(2)}`} />
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-blue-100">
          <span className="text-sm font-extrabold text-slate-900">{isAr ? "الإجمالي" : "Total"}</span>
          <span className="text-xl font-black text-blue-600">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* ── Buttons ── */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={isProcessing}
          className="flex items-center gap-2 px-5 py-3.5 rounded-2xl border-2 border-blue-100 text-slate-600 font-bold text-sm hover:border-blue-300 transition-all disabled:opacity-40"
          style={{ fontFamily: "inherit" }}
        >
          <ArrowLeft size={15} className={isAr ? "rotate-180" : ""} />
          {isAr ? "تعديل" : "Edit"}
        </button>
        <button
          onClick={onPlaceOrder}
          disabled={isProcessing}
          className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-blue-600 text-white font-extrabold text-sm hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ fontFamily: "inherit" }}
        >
          {isProcessing ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              {isAr ? "جارٍ المعالجة..." : "Processing..."}
            </>
          ) : (
            <>
              <CreditCard size={16} />
              {isAr ? "تأكيد والدفع عبر PayMob" : "Confirm & Pay with PayMob"}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default OrderConfirm;