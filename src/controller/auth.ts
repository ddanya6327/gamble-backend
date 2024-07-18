import { Request, Response } from "express";
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
  res.status(201).json({ token, name });
}

function createJwtToken(id: number): string {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}
