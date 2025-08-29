import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  onboardingComplete: false,
  otpVerified: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.onboardingComplete = false;
      state.otpVerified = false;
      state.error = null;
    },
    setOtpVerified: (state, action) => {
      state.otpVerified = action.payload;
    },
    setOnboardingComplete: (state, action) => {
      state.onboardingComplete = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setOtpVerified,
  setOnboardingComplete,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
