import { apiSlice } from "../apiEntry";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFounditem: builder.query<any, void>({
      query: () => ({
        url: "/api/devices/found/list",
        method: "GET",
      }),
    }),

    getFounditemByUser: builder.query<any, void>({
      query: () => {
        // Get user email from localStorage or you can pass it as parameter
        const userEmail = localStorage.getItem("email");
        return {
          url: `api/devices/found/by-email/?email=${userEmail}`,
          method: "GET",
        };
      },
    }),

    // createProduct: builder.mutation({
    //   query: (data) => ({
    //     url: "/api/devices/found",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

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
  useGetFounditemByUserQuery,
  useDeleteFounditemMutation,
} = productApi;
