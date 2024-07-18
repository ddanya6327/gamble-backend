import express from "express";
import * as authController from "../controller/auth";

const router = express.Router();

router.post("/signup", authController.signup);

export default router;
