import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    myProducts: [],   // Add this to store user-specific products
    isLoading: false,
    error: null,
    
    setProducts: (products) => set({ products }),
    
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all fields." };
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully" };
    },

    fetchProducts: async () => {
        set({ isLoading: true, error: null });  // Set loading state before fetching
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            set({ products: data.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: error.message });
        }
    },

    // Fetch products specific to the authenticated user
    fetchMyProducts: async () => {
        set({ isLoading: true, error: null });  // Set loading state before fetching
        try {
            const res = await fetch("/api/products/my-products");  // Endpoint for user's products
            const data = await res.json();
            set({ myProducts: data.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: error.message });
        }
    },

    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        // Update UI immediately without refresh
        set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
        return { success: true, message: data.message };
    },

    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
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
