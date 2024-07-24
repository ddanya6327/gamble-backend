import express from "express";
import { isAuth } from "../middleware/auth";

const router = express.Router();

// TODO Pahse 1

router.get("/", (req, res) => {
  res.render("index", { title: "test", time: Date.now() });
});

// Auth
router.get("/login", (req, res) => {
  res.render("auth/login", { title: "test", time: Date.now() });
});

router.get("/signup", (req, res) => {
  res.render("auth/signup", { title: "test", time: Date.now() });
});

router.get("/me", isAuth, (req, res) => {
  res.render("auth/me", { title: "test", time: Date.now() });
});

// Mypage
router.get("/mypage", isAuth, (req, res) => {
  res.render("mypage/index", { title: "test", time: Date.now() });
});

router.get("/betting", isAuth, (req, res) => {
  res.render("mypage/betting", { title: "test", time: Date.now() });
});

export default router;
