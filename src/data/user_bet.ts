import { sequelize } from "../db/database";
import { DataTypes, Model, Optional } from "sequelize";

interface UserBetAttributes {
  id: number;
  userId: number;
  betInfo: object; // TODO データ型が決まったら修正
}

interface UserBetCreationAttributes extends Optional<UserBetAttributes, "id"> {}

class UserBet
  extends Model<UserBetAttributes, UserBetCreationAttributes>
  implements UserBetAttributes
{
  public id!: number;
  public userId!: number;
  public betInfo!: JSON;

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
