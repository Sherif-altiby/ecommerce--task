import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "../types";

interface OrdersState {
  items: Order[];
}

const STORAGE_KEY = "orders";

const load = (): Order[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const save = (items: Order[]) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }
  catch { /* storage full */ }
};

const initialState: OrdersState = {
  items: load(),
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Add a new order — newest first
    addOrder(state, action: PayloadAction<Order>) {
      state.items.unshift(action.payload);   // unshift = prepend → latest on top
      save(state.items);
    },

    // Replace all (e.g. after loading from server)
    setOrders(state, action: PayloadAction<Order[]>) {
      state.items = action.payload;
      save(state.items);
    },

    clearOrders(state) {
      state.items = [];
      save([]);
    },
  },
});

export const { addOrder, setOrders, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;