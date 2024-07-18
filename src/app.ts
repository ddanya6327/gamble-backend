import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import { config } from "../config";
import { sequelize } from "./db/database";

import userRouter from "./router/users";
import authRouter from "./router/auth";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(config.host.port, () => {
  console.log("server started");
});

// sequelize.sync().then((client) => {
//   console.log(client);
// });
