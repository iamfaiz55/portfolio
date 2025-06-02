import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

interface IProject {
  _id?: string;
  name: string;
  desc: string;
  shortDesc: string;
  image: FileList | null | undefined;
  tech: string[];
  duration: string;
  link: string | null | undefined;
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/project`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state?.auth.user?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery,
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    getAllProjects: builder.query<IProject[], void>({
      query: () => "/get-projects",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Project" as const,
                id: _id,
              })),
              { type: "Project", id: "LIST" },
            ]
          : [{ type: "Project", id: "LIST" }],
      transformResponse: (response: { message: string; result: IProject[] }) =>
        response.result,
      transformErrorResponse: (error: {
        status: number;
        data: { message: string };
      }) => error.data.message,
    }),

    getSingleProject: builder.query<IProject, string>({
      query: (id) => ({
        url: `/details/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Project", id }],
      transformResponse: (data: { message: string; result: IProject }) => {
        return data.result;
      },
      transformErrorResponse: (error: {
        status: number;
        data: { message: string };
      }) => error.data.message,
    }),

    addProject: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/add-project",
        method: "POST",
        body: formData,
        // Don't set Content-Type header - let browser set it with boundary
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
      transformErrorResponse: (error: {
        status: number;
        data: { message: string };
      }) => error.data.message,
    }),

    updateProject: builder.mutation<void, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/update-project/${id}`,
        method: "PUT",
        body: data,
        // Let browser set Content-Type with boundary for FormData
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Project", id }],
      transformErrorResponse: (error: {
        status: number;
        data: { message: string };
      }) => error.data.message,
    }),

    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
      transformErrorResponse: (error: {
        status: number;
        data: { message: string };
      }) => error.data.message,
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetSingleProjectQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
