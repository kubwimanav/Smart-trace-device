import { apiSlice } from "../apiEntry";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getLostitem: builder.query<any, void>({
      query: () => ({
        url: "/api/devices/lost/list",
        method: "GET",
      }),
    }),

    createLost: builder.mutation({
      query: (data) => ({
        url: "api/devices/lost/",
        method: "POST",
        body: data,
      }),
    }),

    deleteLostitem: builder.mutation({
      query: (id) => ({
        url: `/api/devices/lost/${id}/delete/`,
        method: "DELETE",
      }),
    }),
  
  }),
});

export const {
    useCreateLostMutation,
    useGetLostitemQuery,
    useDeleteLostitemMutation,
  
} = productApi;
