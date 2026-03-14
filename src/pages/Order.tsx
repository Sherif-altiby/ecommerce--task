import { ShoppingBag, Package, ArrowRight, Sparkles } from "lucide-react";
import { Link }          from "react-router-dom";
import { useLang } from "../store/hooks";
import StatusBadge from "../components/order/Statusbadge";
import { ROUTES } from "../types";
import { useOrders } from "../hooks/useOrders";
import OrderCard from "../components/order/Ordercard";
import OrderDetailModal from "../components/order/Orderdetailmodal";


const OrderStats = ({ total, delivered, inProgress }: {
  total: number; delivered: number; inProgress: number;
}) => {
  const { isAr } = useLang();
  const stats = [
    { label: isAr ? "إجمالي الطلبات" : "Total Orders",  value: total,      color: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-100"    },
    { label: isAr ? "تم التسليم"     : "Delivered",      value: delivered,  color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
    { label: isAr ? "قيد التنفيذ"   : "In Progress",    value: inProgress, color: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-100"   },
  ];
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {stats.map((s) => (
        <div key={s.label} className={`rounded-2xl border p-3 sm:p-4 text-center ${s.bg} ${s.border}`}>
          <p className={`text-2xl sm:text-3xl font-black ${s.color}`}>{s.value}</p>
          <p className="text-xs text-slate-500 font-semibold mt-0.5 leading-tight">{s.label}</p>
        </div>
      ))}
    </div>
  );
};

const LatestOrderBanner = ({
  order, onClick,
}: {
  order: { orderNumber: string; status: string; statusAr: string; totalAmount: number; date: string };
  onClick: () => void;
}) => {
  const { isAr } = useLang();
  return (
    <button
      onClick={onClick}
      className="w-full text-start mb-6 p-5 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white hover:shadow-xl hover:shadow-blue-200 hover:scale-[1.01] transition-all duration-200"
      style={{ fontFamily: "inherit" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={14} className="text-blue-200" />
        <span className="text-xs font-black uppercase tracking-widest text-blue-200">
          {isAr ? "آخر طلب" : "Latest Order"}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-extrabold tracking-tight">{order.orderNumber}</p>
          <p className="text-blue-200 text-xs mt-0.5">{order.date}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusBadge status={order.status} statusAr={order.statusAr} size="sm" />
          <p className="text-xl font-black">${order.totalAmount.toFixed(2)}</p>
        </div>
      </div>
    </button>
  );
};

const EmptyOrders = () => {
  const { isAr } = useLang();
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-5">
      <div className="w-24 h-24 rounded-3xl bg-blue-50 border-2 border-blue-100 flex items-center justify-center">
        <ShoppingBag size={40} className="text-blue-300" />
      </div>
      <div>
        <p className="text-lg font-extrabold text-slate-800 mb-1">
          {isAr ? "لا توجد طلبات بعد" : "No orders yet"}
        </p>
        <p className="text-sm text-slate-400 max-w-xs mx-auto">
          {isAr
            ? "لم تقم بأي طلبات حتى الآن. ابدأ التسوق الآن!"
            : "You haven't placed any orders yet. Start shopping!"}
        </p>
      </div>
      <Link
        to={ROUTES.PRODUCTS}
        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white text-sm font-extrabold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95 transition-all"
      >
        <Package size={15} />
        {isAr ? "تصفح المنتجات" : "Browse Products"}
        <ArrowRight size={14} className={isAr ? "rotate-180" : ""} />
      </Link>
    </div>
  );
};

const OrdersPage = () => {
  const { isAr } = useLang();
  const { orders, latestOrder, selectedOrder, openOrder, closeOrder, user } = useOrders();

  const delivered  = orders.filter((o) => o.status === "Delivered").length;
  const inProgress = orders.filter((o) => o.status !== "Delivered" && o.status !== "Cancelled").length;

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* ── Header ── */}
        <div className="mb-6">
          <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">
            {isAr ? "حسابي" : "My Account"}
          </p>
          <h1 className="text-2xl font-extrabold text-slate-900">
            {isAr ? "طلباتي 📦" : "My Orders 📦"}
          </h1>
          {user && (
            <p className="text-sm text-slate-400 mt-0.5">
              {isAr
                ? `مرحباً، ${user.nameAr ?? user.name}`
                : `Welcome back, ${user.name}`}
            </p>
          )}
        </div>

        {/* ── Empty ── */}
        {orders.length === 0 && <EmptyOrders />}

        {/* ── Orders ── */}
        {orders.length > 0 && (
          <>
            {/* Stats */}
            <OrderStats
              total={orders.length}
              delivered={delivered}
              inProgress={inProgress}
            />

            {/* Latest order highlighted */}
            {latestOrder && (
              <LatestOrderBanner
                order={latestOrder}
                onClick={() => openOrder(latestOrder)}
              />
            )}

            {/* All orders list */}
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
              {isAr ? "كل الطلبات" : "All Orders"}
            </p>
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} onClick={openOrder} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Detail modal ── */}
      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={closeOrder} />
      )}
    </div>
  );
};

export default OrdersPage;