import express from "express";
import { postOrder, getOrders, deleteOrder} from "../controllers/orders.controller.js";
import { userAuthorization } from "../middlewares/authorization.middleware.js";
import { orderValidation } from "../middlewares/orderValidation.middleware.js";

const router = express.Router();

router.use(userAuthorization);
router.post("/orders", orderValidation, postOrder);
router.get("/orders", getOrders);
router.delete("/orders/:ID_ORDER", deleteOrder);

export { router as ordersRouter };