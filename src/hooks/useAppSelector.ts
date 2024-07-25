import { RootState } from "@/services/types/reduxTypes";
import { TypedUseSelectorHook, useSelector as selectorHook } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;
