import { X, MapPin, CreditCard, Package } from "lucide-react";
import { useEffect }   from "react";
import type { Order } from "../../types";
import { useLang } from "../../store/hooks";
import StatusBadge from "./Statusbadge";
import OrderTimeline from "./Ordertimeline";


interface OrderDetailModalProps {
  order:   Order;
  onClose: () => void;
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4 py-2 border-b border-slate-50 last:border-0">
    <span className="text-xs text-slate-400 font-medium shrink-0">{label}</span>
    <span className="text-xs font-semibold text-slate-700 text-end">{value}</span>
  </div>
);

const Section = ({
  icon, title, children,
}: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl border border-blue-100 p-5">
    <div className="flex items-center gap-2 mb-4">
      <span className="text-blue-500">{icon}</span>
      <h3 className="text-sm font-extrabold text-slate-800">{title}</h3>
    </div>
    {children}
  </div>
);

const OrderDetailModal = ({ order, onClose }: OrderDetailModalProps) => {
  const { t, isAr } = useLang();

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] flex flex-col bg-blue-50 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl animate-[slideUp_0.3s_cubic-bezier(0.34,1.56,0.64,1)]">

        {/* ── Drag handle (mobile) ── */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-slate-300" />
        </div>

        {/* ── Modal header ── */}
        <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-blue-100 shrink-0">
          <div>
            <p className="text-xs text-slate-400 font-semibold mb-0.5">
               {t("orders.detailsTitle")}
            </p>
            <p className="text-base font-extrabold text-slate-900 tracking-tight">
              {order.orderNumber}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={order.status} statusAr={order.statusAr} />
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-all hover:scale-105"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-5 flex flex-col gap-4">

          {/* Items */}
          <Section icon={<Package size={16} />} title={isAr ? `المنتجات (${order.items.length})` : `Items (${order.items.length})`}>
            <div className="flex flex-col gap-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center text-2xl shrink-0">
                    {item.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">
                      {isAr ? item.nameAr : item.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm font-black text-blue-600 shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Price summary */}
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
              <div className="flex justify-between text-xs text-slate-500">
                <span> {t("orders.subtotal")} </span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span> {t("orders.shippingTax")} </span>
                <span className="font-semibold">${(order.totalAmount - subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1 border-t border-slate-100">
                <span> {t("orders.total")} </span>
                <span className="text-blue-600">${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </Section>

          {/* 2-col grid for shipping + payment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Shipping */}
            <Section icon={<MapPin size={16} />} title={isAr ? "عنوان الشحن" : "Shipping Address"}>
              <Row label= {t("orders.labelStreet")}  value={isAr ? order.shippingAddress.streetAr  : order.shippingAddress.street} />
              <Row label= {t("orders.labelCity")}     value={isAr ? order.shippingAddress.cityAr    : order.shippingAddress.city} />
              <Row label= {t("orders.labelCountry")}  value={isAr ? order.shippingAddress.countryAr : order.shippingAddress.country} />
              <Row label= {t("orders.labelZip")}  value={order.shippingAddress.zip} />
            </Section>

            {/* Payment */}
            <Section icon={<CreditCard size={16} />} title={isAr ? "الدفع" : "Payment"}>
              <Row label={t("orders.labelMethod")}  value={isAr ? order.paymentMethodAr  : order.paymentMethod} />
              <Row label={t("orders.labelStatus")}  value={isAr ? order.paymentStatusAr  : order.paymentStatus} />
              <Row label={t("orders.labelDate")}    value={order.date} />
            </Section>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-blue-100 p-5">
            <p className="text-sm font-extrabold text-slate-800 mb-5">
              {t("orders.trackingSection")} 
            </p>
            <OrderTimeline timeline={order.timeline} />
          </div>

        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(60px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
      `}</style>
    </div>
  );
};

export default OrderDetailModal;