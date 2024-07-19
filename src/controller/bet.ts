import { Request, Response } from "express";
import * as userBetsRepository from "../data/user_bet";

export async function upsertUserBet(
  req: Request,
  res: Response
): Promise<void | Response> {
  const userId = req.userId!;
  const betInfo = req.body;

  if (Object.keys(betInfo).length === 0) {
    return res.status(400).json({ message: `Bad Request` });
  }

  const userBetInfo = {
    userId,
    betInfo,
  };

  const userBetData = await userBetsRepository.findByUserId(userId);

  let result;
  if (userBetData) {
    result = await userBetsRepository.updateById(userBetData.id, userBetInfo);
  } else {
    result = await userBetsRepository.create(userBetInfo);
  }

  res.status(201).json({ result });
}
