import express from "express";
import * as userController from "../controller/user";
import { isAuth } from "../middleware/auth";

const router = express.Router();

router.get("/:id", isAuth, userController.getUser);

export default router;
