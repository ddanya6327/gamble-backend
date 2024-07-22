import { sequelize } from "../db/database";
import { DataTypes, Model, Optional } from "sequelize";
import { UserBetInfo } from "../types/betResult";

interface UserBetResultAttributes {
  id: number;
  userId: number;
  bettingResultId: number;
  betInfo: UserBetInfo;
  result: boolean;
  winningNumber: number;
  resultAmount: number;
}

interface UserBetResultCreationAttributes
  extends Optional<UserBetResultAttributes, "id"> {}

class UserBetResult
  extends Model<UserBetResultAttributes, UserBetResultCreationAttributes>
  implements UserBetResultAttributes
{
  public id!: number;
  public userId!: number;
  public bettingResultId!: number;
  public betInfo!: UserBetInfo;
  public result!: boolean;
  public winningNumber!: number;
  public resultAmount!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserBetResult.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
    bettingResultId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "bets_result_id",
    },
    betInfo: {
      type: DataTypes.JSON,
      allowNull: false,
      field: "bet_info",
    },
    result: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    winningNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "winning_number",
    },
    resultAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "result_amount",
    },
  },
  {
    sequelize,
    tableName: "User_bet_results",
    modelName: "UserBetResult",
  }
);

export async function create(
  data: UserBetResultCreationAttributes
): Promise<UserBetResult> {
  return UserBetResult.create(data);
}
