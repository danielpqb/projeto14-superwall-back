import express from "express";
import { getAll, getOne } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", getOne);

export { router as productsRouter };
