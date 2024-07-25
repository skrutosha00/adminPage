import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL, PHOTO, SEARCH, STATISTICS, TOKEN_COUNT_GRAPH, USER, USER_COUNT_GRAPH } from "@/services/globalVars";
import transformUserResponse from "@/utils/transformUserResponse";

export const mainApi = createApi({
  reducerPath: "main/api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    }
  }),
  endpoints: (build) => ({
    getUserDBInfo: build.query<TUserDBInfo, TGetUserDBInfo>({
      query: ({ id, multiplier }) => ({
        url: `${USER}`,
        params: { id, multiplier }
      }),
      transformResponse: transformUserResponse
    }),
    getUserPhoto: build.query<string, TGetUserPhoto>({
      query: ({ id }) => ({
        url: `${PHOTO}`,
        params: { id }
      })
    }),
    searchUser: build.query<TSearchUser[], TSearchUserParams>({
      query: ({ q }) => ({ url: `${SEARCH}`, params: { q } })
    }),
    getTokenCountGraph: build.query<TTokenCountGraph, TGetTokenCountGraph>({
      query: ({ stat_interval }) => ({
        url: `${TOKEN_COUNT_GRAPH}`,
        params: { stat_interval }
      })
    }),
    getUserCountGraph: build.query<TUserCountGraph, TGetUserCountGraph>({
      query: ({ stat_interval, bot, searchIn, user_id }) => ({
        url: `${USER_COUNT_GRAPH}`,
        params: { stat_interval, bot, searchIn, user_id }
      })
    }),
    getStatistics: build.query<TStatistics, {}>({
      query: ({}) => ({
        url: `${STATISTICS}`
      })
    })
  })
});

export const {
  useGetUserDBInfoQuery,
  useGetUserPhotoQuery,
  useSearchUserQuery,
  useGetTokenCountGraphQuery,
  useGetUserCountGraphQuery,
  useGetStatisticsQuery
} = mainApi;
