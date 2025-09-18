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
  }),
});

export const {
 useGetContactQuery,
  useCreatecontactMutation,
} = productApi;
