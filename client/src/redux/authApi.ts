import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store"; // Import RootState to get the token from Redux
// import { IUser } from "@/models/user.interface";
import { RootState } from "./store";
// import { IUser } from "../models/user.interface";
interface IUser {
  name: string;
  email: string;
  password: string;
  token?: string;
  _id?: string;
}

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/api/v1/auth",
  baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token || "";
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    signOut: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/sign-out",
        method: "POST",
      }),
    }),

    login: builder.mutation<
      { message: string; result: IUser },
      { email: string; password: string }
    >({
      query: (userData) => ({
        url: "/sign-in",
        method: "POST",
        body: userData,
      }),
      transformResponse(data: { message: string; result: IUser }) {
        return data;
      },
    }),

    register: builder.mutation<{ message: string; result: IUser }, IUser>({
      query: (userData) => ({
        url: "/sign-up",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

// Export Hooks
export const { useLoginMutation, useSignOutMutation, useRegisterMutation } =
  authApi;
