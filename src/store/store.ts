import { configureStore } from "@reduxjs/toolkit";
import languageReducer    from "./languageSlice";
import cartReducer        from "./cartSclice";      
import ordersReducer      from "./cartSclice";

export const store = configureStore({
  reducer: {
    language:  languageReducer,
    cart:      cartReducer,   
    orders:    ordersReducer,
                       
  },
});

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;