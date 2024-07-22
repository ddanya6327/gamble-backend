import * as bettingsRepository from "../data/betting_result";
import * as userBetsRepository from "../data/user_bet";
import * as usersRepository from "../data/user";
import * as userBetResultsRepository from "../data/user_bet_result";
import { BetResult, BetInfo } from "../types/betResult";

const { UserBet } = userBetsRepository;

type CheckBetResult = {
  bettingSum: number;
  winningBetAmount: number;
  resultAmount: number;
  betResult: boolean;
};

export async function createBetResult() {
  const betResult = await bettingsRepository.create();
  return betResult;
}

export async function updateUserBetData(betResultId: number): Promise<void> {
  const bettingResult = await bettingsRepository.findById(betResultId);
  if (!bettingResult) {
    throw Error("bettingResult not found!");
  }
  const { winningNumber, id: bettingResultId } = bettingResult.dataValues;

  const userBets = await UserBet.findAll();
  userBets.map(
    async (userBet) =>
      await checkUserBetAndUpdate(userBet, winningNumber, bettingResultId)
  );

  await userBetsRepository.deleteAll();
}

async function checkUserBetAndUpdate( //
  userBet: InstanceType<typeof UserBet>,
  winningNumber: number,
  bettingResultId: number
) {
  const { betInfo, userId } = userBet.dataValues;
  const { bettingSum, betResult, resultAmount } = checkaBetResult(
    betInfo,
    winningNumber
  );

  await userBetResultsRepository.create({
    userId,
    bettingResultId,
    betInfo: { ...betInfo, bettingSum },
    result: betResult,
    winningNumber,
    resultAmount: resultAmount,
  });

  await usersRepository.updateMoney(userId, resultAmount);
}

function checkaBetResult(
  betInfo: BetInfo,
  winningNumber: number
): CheckBetResult {
  const bettingSum = Object.values(betInfo).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const winningBetAmount = betInfo[winningNumber.toString() as BetResult];

  const resultAmount =
    winningBetAmount + winningBetAmount * winningNumber - bettingSum;

  return {
    bettingSum,
    winningBetAmount,
    resultAmount,
    betResult: !!winningBetAmount,
  };
}
