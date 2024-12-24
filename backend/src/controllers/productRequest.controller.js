import mongoose from "mongoose";
import ProductRequest from "../models/productRequest.model.js"; // Assuming the productRequest model exists
import Product from "../models/product.model.js"; // Assuming the product model exists

// Fetch all product requests
export const getProductRequests = async (req, res) => {
    try {
        const productRequests = await ProductRequest.find({}).populate('user', 'name email'); // Populate user details
        res.status(200).json({ success: true, data: productRequests });
    } catch (error) {
        console.log("Error in fetching product requests:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Fetch product requests by the specific user (based on userId parameter)
export const myProductRequests = async (req, res) => {
    const { userId } = req.params; // Get the userId from the URL parameter

    try {
        const productRequests = await ProductRequest.find({ user: userId }).populate('user', 'name email'); // Filter by userId
        res.status(200).json({ success: true, data: productRequests });
    } catch (error) {
        console.log("Error in fetching user's product requests:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Create a product request
export const createProductRequest = async (req, res) => {
    try {
        const { productName, message, description } = req.body;

        // Check if all required fields are present
        if (!productName || !message) {
            return res.status(400).json({ success: false, message: "Product name and message are required." });
        }

        // Create a new product request
        const newProductRequest = new ProductRequest({
            user: req.user._id, // Get the userId from the protected route
            productName,
            message,
            description,
            status: 'open', // Set initial status as 'open'
        });

        await newProductRequest.save();
        res.status(201).json({ success: true, message: "Product request created successfully.", data: newProductRequest });
    } catch (error) {
        console.log("Error creating product request:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Update a product request (allow changes to productName, message, description)
export const updateProductRequest = async (req, res) => {
    const { id } = req.params;
    const { productName, message, description, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Request ID" });
    }

    // Only allow status to be updated to 'fulfilled'
    if (status && status !== 'fulfilled') {
        return res.status(400).json({ success: false, message: "Invalid status. Only 'fulfilled' is allowed." });
    }

    try {
        const updatedRequest = await ProductRequest.findByIdAndUpdate(
            id,
            { productName, message, description, status }, // Update multiple fields
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ success: false, message: "Product request not found." });
        }

        res.status(200).json({ success: true, message: "Product request updated.", data: updatedRequest });
    } catch (error) {
        console.log("Error updating product request:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Delete a product request
export const deleteProductRequest = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Request ID" });
    }

    try {
        const deletedRequest = await ProductRequest.findByIdAndDelete(id);
        if (!deletedRequest) {
            return res.status(404).json({ success: false, message: "Product request not found." });
        }
        res.status(200).json({ success: true, message: "Product request deleted." });
    } catch (error) {
        console.log("Error deleting product request:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
