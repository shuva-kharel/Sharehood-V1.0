import { Box, useColorModeValue } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import MyProductsPage from "./pages/MyProductsPage";

import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!user.isVerified) {
    return <Navigate to='/verify-email' replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to='/' replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Always render hooks and components in the same order
  const checkingAuth = isCheckingAuth;
  const authenticated = isAuthenticated;

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      {checkingAuth ? (
        <LoadingSpinner />
      ) : (
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Navbar />
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/my-products'
            element={
              <ProtectedRoute>
                <Navbar />
                <MyProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Navbar />
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/create'
            element={
              <ProtectedRoute>
                <Navbar />
                <CreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/signup'
            element={
              <RedirectAuthenticatedUser>
                <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
                  {/* Floating shapes */}
                  <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
                  <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
                  <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
                  <SignUpPage />
                </div>
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path='/login'
            element={
              <RedirectAuthenticatedUser>
                <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
                  {/* Floating shapes */}
                  <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
                  <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
                  <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
                  <LoginPage />
                </div>
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path='/verify-email'
            element={
              <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
                <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
                <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
                <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
                <EmailVerificationPage />
              </div>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <RedirectAuthenticatedUser>
                <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
                  {/* Floating shapes */}
                  <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
                  <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
                  <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
                  <ForgotPasswordPage />
                </div>
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path='/reset-password/:token'
            element={
              <RedirectAuthenticatedUser>
                <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
                  {/* Floating shapes */}
                  <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
                  <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
                  <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
                  <ResetPasswordPage />
                </div>
              </RedirectAuthenticatedUser>
            }
          />
          <Route path='/create' element={<CreatePage />} />
          {/* catch all routes */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      )}
      <Toaster />
    </Box>
  );
}

export default App;
