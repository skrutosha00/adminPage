import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStructureFilter } from "@/services/types";

export type TStructureFilterState = { structureFilter: TStructureFilter };

export const initialState = { structureFilter: "all" as TStructureFilter };

export const structureFilterSlice = createSlice({
  name: "structureFilter",
  initialState,
  reducers: {
    changeStructureFilter(state: TStructureFilterState, action: PayloadAction<TStructureFilter>) {
      state.structureFilter = action.payload;
    }
  }
});

export const structureFilterActions = structureFilterSlice.actions;
export const structureFilterReducer = structureFilterSlice.reducer;
