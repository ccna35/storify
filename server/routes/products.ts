import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "../controllers/products";
import { verifyToken } from "../util/token";

const router = Router();

// Middleware
router.use(verifyToken);

// Create a new product
router.post("/", createProduct);

// Get all products
router.get("/", getAllProducts);

// Delete a product
router.delete("/:id", deleteProduct);

// Get one product
router.get("/:id", getOneProduct);

// Update a product
router.put("/:id", updateProduct);

export default router;
