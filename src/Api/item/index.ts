import { apiSlice } from "../apiEntry";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFounditem: builder.query<any, void>({
      query: () => ({
        url: "/api/devices/found/list",
        method: "GET",
      }),
    }),
    getLostitem: builder.query<any, void>({
      query: () => ({
        url: "/api/devices/lost/list",
        method: "GET",
      }),
    }),
    getUsers: builder.query<any, void>({
      query: () => ({
        url: "api/auth/users/",
        method: "GET",
      }),
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: "/api/devices/found",
        method: "POST",
        body: data,
      }),
    }),
    createLost: builder.mutation({
      query: (data) => ({
        url: "api/devices/lost/",
        method: "POST",
        body: data,
      }),
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteLostitem: builder.mutation({
      query: (id) => ({
        url: `/api/devices/lost/${id}/delete/`,
        method: "DELETE",
      }),
    }),
    deleteFounditem: builder.mutation({
      query: (id) => ({
        url: `/api/devices/found/${id}/delete/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFounditemQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteLostitemMutation,
  useDeleteFounditemMutation,
  useGetUsersQuery,
  useCreateLostMutation,
  useGetLostitemQuery,
} = productApi;
