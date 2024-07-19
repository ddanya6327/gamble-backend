import express from "express";
import * as betController from "../controller/bet";
import { isAuth } from "../middleware/auth";

const router = express.Router();

router.post("/user_bet", isAuth, betController.upsertUserBet);

export default router;
