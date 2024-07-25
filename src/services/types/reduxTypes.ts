import { store } from "@/services/store";

export type RootState = ReturnType<typeof store.getState>;
