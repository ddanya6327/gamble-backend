import { CookieOptions, Request, Response } from "express";
import { config } from "./../../config";
import * as userRepository from "../data/user";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function signup(
  req: Request,
  res: Response
): Promise<void | Response> {
  const { name, nickname, password } = req.body;

  // ユーザー重複チェック
  const found = await userRepository.findByName(name);
  if (found) {
    return res.status(409).json({ message: `${name} already exists` });
  }

  const hashed: string = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId: number = await userRepository.createUser({
    name,
    nickname,
    password: hashed,
  });
  const token: string = createJwtToken(userId);
  setToken(res, token);
  res.status(201).json({ token, name });
}

export async function login(
  req: Request,
  res: Response
): Promise<void | Response> {
  const { name, password } = req.body;

  const user = await userRepository.findByName(name);
  if (!user) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const isValidPassword: boolean = await bcrypt.compare(
    password,
    user.password
  );
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const token: string = createJwtToken(user.id);
  setToken(res, token);
  res.status(200).json({ token, name });
}

export async function me(
  req: Request,
  res: Response
): Promise<void | Response> {
  const user = await userRepository.findById(req.userId!);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ token: req.token, username: user.name });
}

function createJwtToken(id: number): string {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

function setToken(res: Response, token: string): void {
  const options: CookieOptions = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res.cookie("token", token, options);
}
