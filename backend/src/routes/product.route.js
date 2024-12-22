import express from "express";
import { createProduct, deleteProduct, getProducts, myProducts, updateProduct } from "../controllers/product.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"; // Adjust the path as necessary

const router = express.Router();

router.get("/", getProducts);
router.get("/my-products", protectRoute, myProducts);
router.post("/", protectRoute, createProduct);
router.put("/:id", protectRoute, updateProduct);
router.delete("/:id", protectRoute, deleteProduct);

export default router;
