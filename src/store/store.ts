import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./languageSlice";

export const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});

// Types for use across the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;