import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TSettingsState = { isOpen: boolean };

export const settingsLSKey = "settings";
const settingsLS = localStorage.getItem(settingsLSKey);
export const initialState: TSettingsState = settingsLS ? JSON.parse(settingsLS) : { isOpen: false };

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeIsOpen(state: TSettingsState, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
      localStorage.setItem(settingsLSKey, JSON.stringify(state));
    },
    clearSettings(state: TSettingsState) {
      localStorage.removeItem(settingsLSKey);
      state.isOpen = false;
    }
  }
});

export const settingsActions = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
