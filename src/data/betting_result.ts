import { sequelize } from "../db/database";
import { DataTypes, Model, Optional } from "sequelize";
import { BetResult } from "../types/betResult";

interface BettingResultAttributes {
  id: number;
  winningNumber: number;
}

interface BettingResultCreationAttributes
  extends Optional<BettingResultAttributes, "id"> {}

class BettingResult
  extends Model<BettingResultAttributes, BettingResultCreationAttributes>
  implements BettingResultAttributes
{
  public id!: number;
  public winningNumber!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const weights: { value: BetResult; probability: number }[] = [
  { value: "1", probability: 47 },
  { value: "3", probability: 24 },
  { value: "5", probability: 15 },
  { value: "10", probability: 8 },
  { value: "20", probability: 4 },
  { value: "77", probability: 2 },
];

BettingResult.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    winningNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "winning_number",
    },
  },
  {
    sequelize,
    tableName: "betting_results",
    modelName: "BettingResult",
  }
);

export async function create(): Promise<number> {
  const betResult: BetResult = setRandomResult();
  return BettingResult.create({ winningNumber: parseInt(betResult) }).then(
    (data) => data.dataValues.id
  );
}

function setRandomResult(): BetResult {
  const randomNum = Math.random() * 100;
  let cumulative = 0;

  for (const weight of weights) {
    cumulative += weight.probability;
    if (randomNum < cumulative) {
      return weight.value;
    }
  }

  throw new Error("Random number out of BetResult");
}

export async function findById(id: number): Promise<BettingResult | null> {
  return BettingResult.findByPk(id);
}
