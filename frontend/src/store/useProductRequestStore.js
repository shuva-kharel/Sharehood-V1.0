import { create } from "zustand";
import { axiosInstance } from "../lib/axios"; // Make sure this is the correct axios instance

const BASE_URL = "http://localhost:5000"; // Adjust the port if necessary

export const useProductRequestStore = create((set) => ({
  productRequests: [],
  myProductRequests: [],
  isLoading: false,
  error: null,

  // Set all product requests
  setProductRequests: (productRequests) => set({ productRequests }),

  // Set user-specific product requests
  setMyProductRequests: (myProductRequests) => set({ myProductRequests }),

  // Create a new product request
  createProductRequest: async (newProductRequest) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    if (!token) {
      return { success: false, message: "No token found. Please log in." };
    }

    if (!newProductRequest.productName || !newProductRequest.message) {
      return { success: false, message: "Product name and message are required." };
    }

    try {
      const res = await fetch(`${BASE_URL}/api/request/request-products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass the token
        },
        body: JSON.stringify(newProductRequest),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.message || "Failed to create product request." };
      }

      set((state) => ({ productRequests: [...state.productRequests, data.data] }));
      return { success: true, message: "Product request created successfully." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // Fetch all product requests
  fetchProductRequests: async () => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    if (!token) {
      return { success: false, message: "No token found. Please log in." };
    }

    set({ isLoading: true, error: null }); // Set loading state before fetching
    try {
      const res = await fetch(`${BASE_URL}/api/request/product-requests`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the request header
        },
      });

      if (!res.ok) {
        throw new Error("Unauthorized or failed to fetch product requests");
      }

      const data = await res.json();
      set({ productRequests: data.data || [], isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },

  // Fetch user's product requests based on userId
  fetchMyProductRequests: async (userId) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    if (!token) {
      return { success: false, message: "No token found. Please log in." };
    }

    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/api/request/product-requests/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Unauthorized or failed to fetch product requests");
      }

      const data = await res.json();
      set({ myProductRequests: data.data || [], isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },

  // Update the status of a product request (e.g., mark as fulfilled)
  updateProductRequest: async (requestId, updatedRequest) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    if (!token) {
      return { success: false, message: "No token found. Please log in." };
    }

    try {
      const res = await fetch(`${BASE_URL}/api/request/product-requests/${requestId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass the token
        },
        body: JSON.stringify(updatedRequest),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.message || "Failed to update product request." };
      }

      set((state) => ({
        productRequests: state.productRequests.map((req) =>
          req._id === requestId ? { ...req, ...updatedRequest } : req
        ),
        myProductRequests: state.myProductRequests.map((req) =>
          req._id === requestId ? { ...req, ...updatedRequest } : req
        ),
      }));
      return { success: true, message: "Product request updated successfully." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // Delete a product request
  deleteProductRequest: async (requestId) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    if (!token) {
      return { success: false, message: "No token found. Please log in." };
    }

    try {
      const res = await fetch(`${BASE_URL}/api/request/product-requests/${requestId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        myProductRequests: state.myProductRequests.filter(
          (request) => request._id !== requestId
        ),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
}));

export default useProductRequestStore;
