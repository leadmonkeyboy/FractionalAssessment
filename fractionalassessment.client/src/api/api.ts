import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import camelize from "camelize-ts";
import { BaseballPlayer } from "../models/baseball_player";

export const fractionalApi = createApi({
    reducerPath: 'fractionalApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://localhost:7001'}),
    tagTypes: ['players'],
    endpoints: (builder) => ({
        getBaseballPlayers: builder.query<BaseballPlayer[], void>({
            query: () => '/BaseballPlayer',
            providesTags: ['players'],
            transformResponse: (response: BaseballPlayer[]) => {
                return camelize(response);
            }
        }),
        getBaseballPlayer: builder.query<BaseballPlayer, number>({
            query: (id) => `/BaseballPlayer/${id}`,
            providesTags: ['players'],
            transformResponse: (response: BaseballPlayer) => {
                return camelize(response);
            }
        }),
        postBaseballPlayer: builder.mutation<void, BaseballPlayer>({
            query: (baseballPlayer) => ({
                url: `/BaseballPlayer`,
                method: 'POST',
                body: baseballPlayer
            }),
            invalidatesTags: ['players'],
        }),
    })
});

export const {
    useGetBaseballPlayersQuery, useLazyGetBaseballPlayersQuery,
    useGetBaseballPlayerQuery, useLazyGetBaseballPlayerQuery,
    usePostBaseballPlayerMutation
} = fractionalApi;