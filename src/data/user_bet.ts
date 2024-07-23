import { sequelize } from "../db/database";
import { DataTypes, Model, Optional } from "sequelize";
import { BetInfo } from "../types/betResult";

interface UserBetAttributes {
  id: number;
  userId: number;
  betInfo: BetInfo;
}

interface UserBetCreationAttributes extends Optional<UserBetAttributes, "id"> {}

export class UserBet
  extends Model<UserBetAttributes, UserBetCreationAttributes>
  implements UserBetAttributes
{
  public id!: number;
  public userId!: number;
  public betInfo!: BetInfo;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserBet.init(
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
    betInfo: {
      type: DataTypes.JSON,
      allowNull: false,
      field: "bet_info",
    },
  },
  {
    sequelize,
    tableName: "user_bets",
    modelName: "UserBet",
  }
);

export async function findById(id: number): Promise<UserBet | null> {
  return UserBet.findByPk(id);
}

export async function findByUserId(userId: number): Promise<UserBet | null> {
  return UserBet.findOne({ where: { userId } });
}

export async function create(
  data: UserBetCreationAttributes
): Promise<UserBet> {
  return UserBet.create(data);
}

export async function updateById(
  id: number,
  data: Pick<UserBetAttributes, "betInfo">
): Promise<[number, UserBet[]]> {
  return UserBet.update(data, {
    where: { id },
    returning: true,
  });
}

export async function deleteAll(): Promise<void> {
  await UserBet.destroy({
    where: {},
    truncate: true,
  });
}

export async function deleteUserBet(userId: number): Promise<void> {
  await UserBet.destroy({
    where: { userId },
  });
}
