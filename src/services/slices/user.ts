import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TelegramUser } from "telegram-login-button";
import { settingsLSKey } from "./settings";
import { langLSKey } from "./lang";

export type TUser = TelegramUser | null;
export type TUserState = { user: TUser };

const userLSKey = "user";
export const lastLoginLSKey = "lastLogin";

export const initialState: TUserState = { user: JSON.parse(localStorage.getItem(userLSKey) ?? "null") };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess(state: TUserState, action: PayloadAction<TelegramUser>) {
      localStorage.setItem(userLSKey, JSON.stringify(action.payload));
      localStorage.setItem(lastLoginLSKey, new Date().getTime().toString());

      state.user = action.payload;
    },
    logoutSuccess(state: TUserState) {
      localStorage.removeItem(userLSKey);
      localStorage.removeItem(settingsLSKey);
      localStorage.removeItem(langLSKey);
      localStorage.removeItem(lastLoginLSKey);

      state.user = null;
    }
  }
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
