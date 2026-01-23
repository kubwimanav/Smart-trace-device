import { apiSlice } from "../apiEntry";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContact: builder.query<any, void>({
      query: () => ({
        url: "api/devices/contact/list/",
        method: "GET",
      }),
    }),
  

    createcontact: builder.mutation({
      query: (data) => ({
        url: "api/devices/contact",
        method: "POST",
        body: data,
      }),
    }),
    deletecontact: builder.mutation({
      query: (id) => ({
        url: `/api/devices/contact/${id}/`,
        method: "DELETE",
      }),
    }),

    deleteMatchitem: builder.mutation({
      query: (id) => ({
        url: `api/devices/matches/${id}/delete/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetContactQuery,
  useCreatecontactMutation,
  useDeletecontactMutation,
  useDeleteMatchitemMutation,
} = productApi;
