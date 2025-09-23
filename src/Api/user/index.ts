import { apiSlice } from "../apiEntry";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => ({
        url: "api/auth/users/",
        method: "GET",
      }),
    }),

    getMatch: builder.query<any, void>({
      query: () => ({
        url: "api/devices/matches/list/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetMatchQuery,
 
} = productApi;
