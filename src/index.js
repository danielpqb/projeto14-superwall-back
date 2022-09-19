import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { userRouter } from "./routers/user.router.js";
import { productsRouter } from "./routers/products.router.js";
import { ordersRouter } from "./routers/orders.router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(productsRouter);
app.use(ordersRouter);

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
