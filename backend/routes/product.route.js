import express from "express";
import { createProduct, deleteProduct, getProducts, myProducts, updateProduct } from "../controllers/product.controller.js";
import { verifyToken } from "../middleware/verifyToken.js"; // Adjust the path as necessary

const router = express.Router();

router.get("/", getProducts);
router.get("/my-products", verifyToken, myProducts);
router.post("/", verifyToken, createProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

export default router;
