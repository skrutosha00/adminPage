import { Location } from "react-router-dom";

export type TLocationState = {
  from: string;
  backgroundLocation: string;
};

export type TLocation = Location<TLocationState>;

export type TLang = "en" | "ru" | "es";

export type TSize = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";

export type TStructureFilter = "all" | "active" | "inactive";
