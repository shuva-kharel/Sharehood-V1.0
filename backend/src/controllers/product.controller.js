import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const myProducts = async (req, res) => {
    try {
        const products = await Product.find({ userId: req.userId }); // Filter by authenticated user's ID
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in fetching user's products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, address } = req.body;
    
        // Check if all required fields are present
        if (!name || !price || !image || !address) {
          return res.status(400).json({ message: "Missing required fields." });
        }
    
        // Create a new product
        const newProduct = new Product({
          name,
          price,
          image,
          address,
          description,
          userId: req.user._id, // Get the userId from the protected route
        });
    
        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", data: newProduct });
    
      } catch (error) {
        console.log("Error creating product:", error);
        res.status(500).json({ message: "Server error while creating product" });
      }
  };

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.log("Error in deleting product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
