import { http, HttpResponse } from "msw";

import { BASE_URL, USER } from "@/services/globalVars";
import { getUser } from "@/mocks/data";

export const handlers = [
  http.get(BASE_URL + USER, ({ params }) => {
    console.log(params);
    return HttpResponse.json(getUser());
  })
];
