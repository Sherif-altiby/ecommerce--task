import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";   
import type { Language } from "../types";
import i18n from "../i18n";


interface LanguageState {
  lang: Language;
  dir: "ltr" | "rtl";
}

const initialState: LanguageState = {
  lang: "en",
  dir: "ltr",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.lang = action.payload;
      state.dir = action.payload === "ar" ? "rtl" : "ltr";
      i18n.changeLanguage(action.payload);   
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;