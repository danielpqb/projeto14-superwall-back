import express from "express";

import {
  signUp,
  signIn,
  getUserByToken,
} from "../controllers/user.controller.js";
import {
  signInValidation,
  signUpValidation,
} from "../middlewares/userValidations.middleware.js";

const router = express.Router();

router.get("/userToken", getUserByToken);
router.post("/account/register", signUpValidation, signUp);
router.post("/account/login", signInValidation, signIn);

export { router as userRouter };
