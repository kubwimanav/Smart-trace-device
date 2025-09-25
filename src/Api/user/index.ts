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

    getReport: builder.query<any, void>({
      query: () => ({
        url: "api/reports/stats/location/",
        method: "GET",
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `api/auth/users/${id}/delete/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetMatchQuery,
  useGetReportQuery,
  useDeleteUserMutation,
 
} = productApi;
