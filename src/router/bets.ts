import express from "express";
import * as betController from "../controller/bet";
import { isAuth } from "../middleware/auth";

const router = express.Router();

router
  .route("/user_bet")
  .get(isAuth, betController.getUserBet)
  .post(isAuth, betController.upsertUserBet)
  .delete(isAuth, betController.deleteUserBet);

export default router;
