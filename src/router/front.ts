import express from "express";
import { isAuth } from "../middleware/auth";

const router = express.Router();

// TODO Pahse 1

router.get("/", (req, res) => {
  // TODO check isAuth
  res.render("index", { title: "test", time: Date.now() });
});

// Auth
router.get("/login", (req, res) => {
  res.render("auth/login", { title: "test", time: Date.now() });
});

router.get("/me", (req, res) => {
  res.render("auth/me", { title: "test", time: Date.now() });
});

// Mypage
router.get("/mypage", (req, res) => {
  res.render("mypage/index", { title: "test", time: Date.now() });
});

export default router;
