import { Request, Response } from "express";
import * as usersRepository from "../data/users";

export async function getUser(req: Request, res: Response): Promise<void> {
  const id: number = parseInt(req.params.id);
  const user = await usersRepository.findById(id);
  res.status(200).json(user);
}
