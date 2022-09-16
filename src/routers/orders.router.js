import express from "express";
import { postOrder, getOrder } from "../controllers/orders.controller.js";
import { userAuthorization } from "../middlewares/authorization.middleware.js";

const router = express.Router();

router.use(userAuthorization);
router.post("/orders", postOrder);
router.get("/orders", getOrder);

export { router as ordersRouter };