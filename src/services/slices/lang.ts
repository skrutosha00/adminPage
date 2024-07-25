import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TLang } from "@/services/types";

export type TLangState = { lang: TLang };

export const langLSKey = "lang";
const defaultLang = "ru";

export const initialState: TLangState = {
  lang: JSON.parse(localStorage.getItem(langLSKey) ?? JSON.stringify(defaultLang))
};

export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    changeLang(state: TLangState, action: PayloadAction<TLang>) {
      localStorage.setItem(langLSKey, JSON.stringify(action.payload));
      state.lang = action.payload;
    },
    clearLang(state: TLangState) {
      localStorage.removeItem(langLSKey);
      state.lang = defaultLang;
    }
  }
});

export const langActions = langSlice.actions;
export const langReducer = langSlice.reducer;
