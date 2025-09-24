import { apiSlice } from "../apiEntry";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLostitem: builder.query<any, void>({
      query: () => ({
        url: "/api/devices/lost/list",
        method: "GET",
      }),
    }),
    getLostitemByUser: builder.query<any, void>({
      query: () => {
        // Get user email from localStorage or you can pass it as parameter
        const userEmail = localStorage.getItem("email");
        return {
          url: `api/devices/lost/by-email/?email=${userEmail}`,
          method: "GET",
        };
      },
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
    useGetLostitemByUserQuery,
    useDeleteLostitemMutation,
  
} = productApi;
