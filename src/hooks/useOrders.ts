import { useState }        from "react";
import { useAppSelector } from "../store/hooks";
import type { Order } from "../types";

export const useOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Read directly from Redux — already sorted newest first (unshift in addOrder)
  const orders = useAppSelector((s) => s.orders.items);

  const latestOrder = orders[0] ?? null;

  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user") ?? "null"); }
    catch { return null; }
  })();

  return {
    orders,
    latestOrder,
    isLoading:  false,
    isError:    false,
    selectedOrder,
    openOrder:  (order: Order) => setSelectedOrder(order),
    closeOrder: ()             => setSelectedOrder(null),
    user,
  };
};