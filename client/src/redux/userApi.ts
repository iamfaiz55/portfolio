import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface IContact {
  name: string;
  email: string;
  message: string;
  mobile: string;
}
const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/api/v1/user",
  baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/contact`,
  credentials: "include",
});

// Create API
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllContacts: builder.query<
      { message: string; result: IContact[] },
      void
    >({
      query: () => ({
        url: "/all-contacts",
        method: "GET",
      }),
      transformResponse(data: { message: string; result: IContact[] }) {
        return data;
      },
      transformErrorResponse: (error: {
        status: number;
        data: { message: string };
      }) => error.data.message,
    }),
    contact: builder.mutation<{ message: string }, IContact>({
      query: (data) => ({
        url: "/contact",
        method: "POST",
        body: data,
      }),
      transformResponse(data: { message: string }) {
        return data;
      },
      transformErrorResponse: (error: {
        status: number;
        data: { message: string };
      }) => error.data.message,
    }),
  }),
});

// Export hooks
export const { useGetAllContactsQuery, useContactMutation } = userApi;
