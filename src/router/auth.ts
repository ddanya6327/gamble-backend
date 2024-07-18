import express from "express";
import * as authController from "../controller/auth";
import { isAuth } from "../middleware/auth";

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.get("/me", isAuth, authController.me);

export default router;
