import express from "express";
import { 
    createProductRequest, 
    getProductRequests, 
    myProductRequests, 
    updateProductRequest, 
    deleteProductRequest 
} from "../controllers/productRequest.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"; // Ensure this is correct

const router = express.Router();

// Route to create a product request
router.post('/request-products', protectRoute, createProductRequest);

// Route to get all product requests
router.get('/product-requests', protectRoute, getProductRequests);

// Route to get product requests by a specific user
router.get('/product-requests/user/:userId', protectRoute, myProductRequests); // Accept userId as a parameter

// Route to update a product request
router.patch('/product-requests/:id', protectRoute, updateProductRequest);

// Route to delete a product request
router.delete('/product-requests/:id', protectRoute, deleteProductRequest);

export default router;
