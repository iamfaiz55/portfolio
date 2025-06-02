import { createSlice } from "@reduxjs/toolkit";
// import { IUser } from "../../models/user.interface";
import { authApi, IUser } from "../authApi";

// Define initial state structure
interface AuthState {
  user: IUser | null;
  token: string | null;
  registerOTP: {
    otp: string | null;
    mobile: number | null;
  };
  sessionExpiredOpen: boolean;
}

// Safely get user data from localStorage
const getUserFromLocalStorage = (): IUser | null => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};
const getRegisterOTPFromLocalStorage = (): {
  otp: string | null;
  mobile: number | null;
} => {
  try {
    const otp = localStorage.getItem("registerOTP");
    return otp ? JSON.parse(otp) : { otp: null, mobile: null };
  } catch (error) {
    console.error("Error parsing registerOTP from localStorage:", error);
    return { otp: null, mobile: null };
  }
};

// Define initial state
const initialState: AuthState = {
  user: getUserFromLocalStorage(),
  token: getUserFromLocalStorage()?.token || null,
  registerOTP: getRegisterOTPFromLocalStorage(),
  sessionExpiredOpen: false,
};

// Create Redux slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          localStorage.setItem("user", JSON.stringify(payload.result));
          state.user = payload.result;
          state.token = payload.result.token || null;
        }
      )

      .addMatcher(authApi.endpoints.signOut.matchFulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("user");
      }),
});

export default authSlice.reducer;

export type { AuthState };
