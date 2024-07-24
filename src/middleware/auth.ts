import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import * as userRepository from "../data/user";

const AUTH_ERROR = { message: "Authentication Error" };

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let token: string | null = null;

  const authHeader: string | undefined = req.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    token = req.cookies["token"];
  }

  if (!token) {
    return res.status(401).json(AUTH_ERROR);
  }

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await userRepository.findById((decoded as jwt.JwtPayload).id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id;
    next();
  });
};
