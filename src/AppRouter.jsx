import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layout Components
import ProtectedRoute from './utils/components/ProtectedRoute/ProtectedRoute';
// import AuthLayout from './features/auth/layout/AuthLayout';
import AppLayout from './features/main/layout/AppLayout';

// Auth Components
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import OTPVerification from './features/auth/OTPVerification';
import UserOnboarding from './features/auth/UserOnboarding';

// App Components
import Dashboard from './features/main/Dashboard';
import Chats from './features/chat/Chats';
import NotFound from './utils/components/Errors/NotFound';


const AppRouter = () => {
  // const { isAuthenticated } = useSelector((state) => state.auth);
  const { isAuthenticated } = true;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
    
               <Login />
           
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
                <Register />
            )
          }
        />

    
        <Route
          path="/verify-email"
          element={
            // <ProtectedRoute requireOnboarding={false}>
                <OTPVerification />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding"
          element={
            // <ProtectedRoute requireOnboarding={false}>
                <UserOnboarding />
            // </ProtectedRoute>
          }
        />

        {/* Protected App Routes */}
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path="/chats"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Chats />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chats/:chatId"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Chats />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Default Redirects */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
