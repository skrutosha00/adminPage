import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { userReducer } from "@/services/slices/user";
import { langReducer } from "@/services/slices/lang";
import { historyReducer } from "@/services/slices/history";
import { structureFilterReducer } from "@/services/slices/structureFilter";
import { settingsReducer } from "@/services/slices/settings";
import { mainApi } from "@/services/api/main.api";

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    user: userReducer,
    lang: langReducer,
    history: historyReducer,
    structureFilter: structureFilterReducer,
    settings: settingsReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mainApi.middleware)
});

setupListeners(store.dispatch);
