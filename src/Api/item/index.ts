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

    PostUser: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login",
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
  usePostUserMutation,
  useCreateLostMutation,
  useGetLostitemQuery,
} = productApi;
