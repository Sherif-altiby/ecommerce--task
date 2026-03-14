// src/store/cartSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../types";

interface CartState {
  items: CartItem[];
}

// ── Load cart from localStorage on startup ────────────────
const loadCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// ── Save cart to localStorage on every change ─────────────
const saveCart = (items: CartItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch {
    // storage full or unavailable — fail silently
  }
};

const initialState: CartState = {
  items: loadCart(),   // ← hydrate from localStorage immediately
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find((i) => i.productId === action.payload.productId);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveCart(state.items);
    },

    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.productId !== action.payload);
      saveCart(state.items);
    },

    updateQty(state, action: PayloadAction<{ productId: number; quantity: number }>) {
      const item = state.items.find((i) => i.productId === action.payload.productId);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
      saveCart(state.items);
    },

    clearCart(state) {
      state.items = [];
      saveCart([]);
    },

    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      saveCart(action.payload);
    },
  },
});

export const { addItem, removeItem, updateQty, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;