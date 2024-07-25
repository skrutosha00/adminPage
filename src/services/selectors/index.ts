import { RootState } from "@/services/types/reduxTypes";

export function userSelector() {
  return (store: RootState) => store.user.user;
}

export function langSelector() {
  return (store: RootState) => store.lang.lang;
}

export function historySelector() {
  return (store: RootState) => store.history.history;
}

export function structureFilterSelector() {
  return (store: RootState) => store.structureFilter.structureFilter;
}

export function settingsSelector() {
  return (store: RootState) => store.settings;
}
