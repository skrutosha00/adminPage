import { http, HttpResponse } from "msw";

import { BASE_URL, PHOTO, SEARCH, TOKEN_COUNT_GRAPH, USER, USER_COUNT_GRAPH } from "@/services/globalVars";
import getUser from "@/mocks/utils/getUser";
import parseParams from "@/mocks/utils/parseParams";
import getUserPhoto from "@/mocks/utils/getUserPhoto";
import getSearchUser from "@/mocks/utils/getSearchUser";
import getGraphUserCount from "@/mocks/utils/getGraphUserCount";
import getGraphTokenCount from "@/mocks/utils/getGraphTokenCount";

const longPause = 500;
const shortPause = 250;

export const handlers = [
  http.get(BASE_URL + USER, async ({ request }) => {
    const { id } = parseParams(request.url);
    await (() => new Promise((resolve) => setTimeout(resolve, longPause)))();
    return HttpResponse.json(getUser(+id));
  }),

  http.get(BASE_URL + PHOTO, async ({ request }) => {
    const { id } = parseParams(request.url);
    await (() => new Promise((resolve) => setTimeout(resolve, shortPause)))();
    return HttpResponse.json(getUserPhoto(+id));
  }),

  http.get(BASE_URL + SEARCH, async () => {
    await (() => new Promise((resolve) => setTimeout(resolve, shortPause)))();
    return HttpResponse.json(Array.from({ length: Math.floor(Math.random() * 20) }, getSearchUser));
  }),

  http.get(BASE_URL + USER_COUNT_GRAPH, async ({ request }) => {
    const { bot, searchIn, stat_interval } = parseParams(request.url);
    await (() => new Promise((resolve) => setTimeout(resolve, longPause)))();
    return HttpResponse.json(getGraphUserCount(+bot, searchIn, +stat_interval));
  }),

  http.get(BASE_URL + TOKEN_COUNT_GRAPH, async ({ request }) => {
    const { stat_interval } = parseParams(request.url);
    await (() => new Promise((resolve) => setTimeout(resolve, longPause)))();
    return HttpResponse.json(getGraphTokenCount(+stat_interval));
  })
];
