import { TLang } from "./types";

export const HOST_PATH = "/";

export const ROUTES = {
  LOGIN: "login",
  MAIN: ":multiplier",
  USER: ":user",
  DEFAULT: "x10",
  STAT: "stat"
};

export const BASE_URL = "";
export const USER = "/user";
export const PHOTO = "/user_photo";
export const SEARCH = "/user_search";
export const TOKEN_COUNT_GRAPH = "/graph_data/token_count";
export const USER_COUNT_GRAPH = "/graph_data/user_count";
export const STATISTICS = "/stat";

export const BOT_NAMES = ["x10", "x11100"];
export const MULTIPLIERS = [10, 11100];
export const GAMES = [4, 6, 8, 10, 12, 14, 16, 18, 20];

export const LANGUAGES: TLang[] = ["ru", "en", "es"];
