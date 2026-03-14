import { ChevronRight, Calendar, CreditCard } from "lucide-react";
import type { Order } from "../../types";
import { useLang } from "../../store/hooks";
import StatusBadge from "./Statusbadge";

interface OrderCardProps {
  order:   Order;
  onClick: (order: Order) => void;
}

const OrderCard = ({ order, onClick }: OrderCardProps) => {
  const { isAr } = useLang();

  // Show first 3 item emojis as a preview
  const itemPreviews = order.items.slice(0, 3);
  const extraCount   = order.items.length - 3;

  return (
    <button
      onClick={() => onClick(order)}
      className="w-full text-start group bg-white rounded-2xl border border-blue-100 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-50 transition-all duration-200 overflow-hidden"
      style={{ fontFamily: "inherit" }}
    >
      {/* ── Top accent bar — color based on status ── */}
      <div className={`h-1 w-full transition-all
        ${order.status === "Delivered"        ? "bg-emerald-400" :
          order.status === "Out for Delivery" ? "bg-orange-400 animate-pulse" :
          order.status === "Shipped"          ? "bg-amber-400" :
          order.status === "Confirmed"        ? "bg-indigo-400" :
          "bg-blue-400"}`}
      />

      <div className="p-5">
        {/* ── Header row ── */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="text-sm font-extrabold text-slate-900 tracking-tight">
              {order.orderNumber}
            </p>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
              <Calendar size={11} />
              {order.date}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <StatusBadge status={order.status} statusAr={order.statusAr} size="sm" />
            <ChevronRight
              size={16}
              className={`text-slate-300 group-hover:text-blue-500 transition-all group-hover:translate-x-0.5 ${isAr ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        {/* ── Item emoji previews ── */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex -space-x-1">
            {itemPreviews.map((item, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center text-xl border-2 border-white shadow-sm"
                style={{ zIndex: itemPreviews.length - i }}
              >
                {item.image}
              </div>
            ))}
            {extraCount > 0 && (
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 border-2 border-white shadow-sm">
                +{extraCount}
              </div>
            )}
          </div>
          <div className="ms-1">
            <p className="text-xs font-semibold text-slate-600">
              {order.items.length} {isAr ? "منتج" : order.items.length === 1 ? "item" : "items"}
            </p>
            <p className="text-[10px] text-slate-400">
              {isAr ? order.items.map(i => i.nameAr).slice(0,2).join("، ")
                     : order.items.map(i => i.name).slice(0,2).join(", ")}
              {order.items.length > 2 ? (isAr ? "..." : "...") : ""}
            </p>
          </div>
        </div>

        {/* ── Footer: total + payment ── */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <CreditCard size={11} />
            {isAr ? order.paymentMethodAr : order.paymentMethod}
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold
              ${order.paymentStatus === "Paid"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-500"}`}
            >
              {isAr ? order.paymentStatusAr : order.paymentStatus}
            </span>
          </div>
          <p className="text-base font-black text-blue-600">
            ${order.totalAmount.toFixed(2)}
          </p>
        </div>
      </div>
    </button>
  );
};

export default OrderCard;