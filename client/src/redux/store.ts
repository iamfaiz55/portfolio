import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import authSlice from "./slices/authSlice";
import { projectApi } from "./projectApi";

const reduxStore = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,

    auth: authSlice,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(authApi.middleware, projectApi.middleware),
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export default reduxStore;
