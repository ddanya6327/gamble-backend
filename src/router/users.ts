import express from "express";
import * as userController from "../controller/user";

const router = express.Router();

router.get("/:id", userController.getUser);

export default router;
