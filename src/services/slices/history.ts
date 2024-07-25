import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type THistoryState = {
  history: number[];
};

export const initialState: THistoryState = { history: [] };

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory(state: THistoryState, action: PayloadAction<number>) {
      state.history.push(action.payload);
    },
    removeLastFromHistory(state: THistoryState) {
      state.history.pop();
    },
    clearHistory(state: THistoryState) {
      state.history = [];
    }
  }
});

export const historyActions = historySlice.actions;
export const historyReducer = historySlice.reducer;
