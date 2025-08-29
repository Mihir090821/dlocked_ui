import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setOtpVerified,
  setOnboardingComplete,
  clearError,
} from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const login = async (credentials) => {
    try {
      dispatch(loginStart());
      //   // Replace with your actual API call
      //   const response = await fetch("/api/auth/login", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(credentials),
      //   });

      //   const data = await response.json();

      //   if (response.ok) {
      //     dispatch(loginSuccess(data.user));
      //     return { success: true };
      //   } else {
      //     dispatch(loginFailure(data.message));
      //     return { success: false, error: data.message };
      //   }
    } catch (error) {
      dispatch(loginFailure("Network error occurred"));
      return { success: false, error: "Network error occurred" };
    }
  };

  const register = async (userData) => {
    try {
      dispatch(loginStart());
      //   // Replace with your actual API call
      //   const response = await fetch("/api/auth/register", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(userData),
      //   });

      //   const data = await response.json();

      //   if (response.ok) {
      //     dispatch(loginSuccess(data.user));
      //     return { success: true };
      //   } else {
      //     dispatch(loginFailure(data.message));
      //     return { success: false, error: data.message };
      //   }
    } catch (error) {
      dispatch(loginFailure("Registration failed"));
      return { success: false, error: "Registration failed" };
    }
  };

  const verifyOtp = async (otp) => {
    try {
      // Replace with your actual API call
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });

      if (response.ok) {
        dispatch(setOtpVerified(true));
        return { success: true };
      } else {
        return { success: false, error: "Invalid OTP" };
      }
    } catch (error) {
      return { success: false, error: "Verification failed" };
    }
  };

  const completeOnboarding = (onboardingData) => {
    // Process onboarding data
    dispatch(setOnboardingComplete(true));
    navigate("/dashboard");
  };

  const signOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return {
    ...auth,
    login,
    register,
    verifyOtp,
    completeOnboarding,
    signOut,
    clearError: () => dispatch(clearError()),
  };
};
