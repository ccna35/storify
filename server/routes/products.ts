import { Router } from "express";
import { getAllProducts } from "../controllers/products";
import { verifyToken } from "../util/token";

const router = Router();

// Middleware
router.use(verifyToken);

// Get all Challenges
router.get("/", getAllProducts);

export default router;
