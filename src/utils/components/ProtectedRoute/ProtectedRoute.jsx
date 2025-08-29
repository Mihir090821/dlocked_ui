import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children, requireOnboarding = true }) => {
  const { isAuthenticated, isLoading, onboardingComplete, otpVerified } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to OTP verification if not verified
  if (!otpVerified) {
    return <Navigate to="/verify-otp" replace />;
  }

  // Redirect to onboarding if not completed and required
  if (requireOnboarding && !onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default ProtectedRoute;
