import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
// import { IUser } from "../models/user.interface";
interface IContact {
  name: string;
  email: string;
  message: string;
  mobile: string;
}
// Custom base query to fetch token from Redux store
const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/api/v1/user",
  baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/contact`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Create API
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    // Fetch all users with pagination
    getAllUsers: builder.query<{ message: string; result: IContact }, void>({
      query: () => ({
        url: "/all-contacts",
        method: "GET",
      }),
      transformResponse(data: {
        message: string;
        result: {
          name: string;
          email: string;
          message: string;
          mobile: string;
        };
      }) {
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
      transformResponse(data: {
        message: string;
        
      }) {
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
export const { useGetAllUsersQuery } = userApi;
