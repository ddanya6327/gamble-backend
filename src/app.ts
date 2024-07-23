import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import { config } from "../config";
import { sequelize } from "./db/database";
import { initSocket } from "./services/socket";

import userRouter from "./router/users";
import authRouter from "./router/auth";
import betRouter from "./router/bets";

import mypageRouter from "./router/mypage"; // TODO Pahse 1
import path from "path";

import * as betService from "./services/betService";

const app = express();

// Set ejs (Phase 1)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/bet", betRouter);

app.use("/mypage", mypageRouter); // TODO Phase 1

app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.sendStatus(500);
});

const appServer = app.listen(config.host.port, () => {
  console.log("server started");
});
initSocket(appServer);

sequelize.sync().then((client) => {
  console.log("sync!");
});

// TODO test
const test = false;
if (test) {
  // Betting結果確認
  betService.createBetResult().then((betResultId) => {
    console.log("betResultId: ", betResultId);
    betService.updateUserBetData(betResultId);
  });
}
