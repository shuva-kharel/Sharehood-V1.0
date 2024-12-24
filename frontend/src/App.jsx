import Navbar from "./components/Navbar";
import {
  HomePage,
  ChatPage,
  SignUpPage,
  LoginPage,
  SettingsPage,
  ProfilePage,
  CreatePage,
  MyProductsPage,
  CreateProductReqPage,
  ProductRequestsPage,
  MyProductRequestsPage
} from "./pages";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ProductRequests from "./pages/ProductRequestPage";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div style={{ fontFamily: 'Exo 2, sans-serif' }} data-theme={theme}>
      {/* Only show the Navbar if the user is logged in */}
      {authUser && <Navbar />}

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/create" element={authUser ? <CreatePage /> : <Navigate to="/login" />} />
        <Route path="/my-products" element={authUser ? <MyProductsPage /> : <Navigate to="/login" />} />
        <Route path="/create-product-request" element={authUser ? <CreateProductReqPage /> : <Navigate to="/login" />} />
        <Route path="/product-request" element={authUser ? <ProductRequestsPage /> : <Navigate to="/login" />} />
        <Route path="/my-product-request" element={authUser ? <MyProductRequestsPage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
