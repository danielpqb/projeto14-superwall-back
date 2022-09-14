import express from "express";
import { getAll } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/products", getAll);

export { router as productsRouter };
