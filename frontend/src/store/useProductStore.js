import { create } from "zustand";
import { axiosInstance } from "../lib/axios"; // Make sure this is the correct axios instance

// Base URL for API requests
const BASE_URL = "http://localhost:5000"; // Adjust the port if necessary

export const useProductStore = create((set) => ({
    products: [],
    myProducts: [], // Add this to store user-specific products
    isLoading: false,
    error: null,
    filteredProducts: [],

    setProducts: (products) => set({ products }),

    createProduct: async (newProduct, token) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Missing required fields." };
        }

        const res = await fetch(`${BASE_URL}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Pass the token
            },
            body: JSON.stringify(newProduct),
        });

        const data = await res.json();

        if (!res.ok) {
            return { success: false, message: data.message || "Failed to create product." };
        }

        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully." };
    },

    fetchProducts: async (location = "") => {
        set({ isLoading: true, error: null }); // Set loading state before fetching
        try {
            const res = await fetch(`${BASE_URL}/api/products`);
            const data = await res.json();

            let filteredProducts = data.data;
            if (location) {
                filteredProducts = data.data.filter(product => product.address === location);
            }

            set({ products: data.data, filteredProducts, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: error.message });
        }
    },

    // Fetch products specific to the authenticated user
    fetchMyProducts: async () => {
        set({ isLoading: true, error: null }); // Set loading state before fetching
        try {
            const res = await fetch(`${BASE_URL}/api/products/my-products`); // Endpoint for user's products
            const data = await res.json();
            set({ myProducts: data.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: error.message });
        }
    },

    deleteProduct: async (pid) => {
        const res = await fetch(`${BASE_URL}/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        // Update UI immediately without refresh
        set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
        return { success: true, message: data.message };
    },

    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`${BASE_URL}/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        // Update UI immediately without refresh
        set((state) => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product)),
        }));

        return { success: true, message: data.message };
    },
}));

export default useProductStore;
