import express from "express";
import { isAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", (req, res) => {
  // TODO check isAuth
  res.render("index", { title: "test", time: Date.now() });
});

export default router;
