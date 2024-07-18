import SQ, { TINYINT } from "sequelize";
import { sequelize } from "../db/database";
const DataTypes = SQ.DataTypes;

export type CreateUser = {
  name: string;
  nickname: string;
  password: string;
};

export type UserType = {
  // CreateUser
  id: number;
  money: number;
  role: number;
};

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  nickname: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  money: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  role: {
    type: TINYINT,
    defaultValue: 0,
  },
});

export async function findById(id: number) {
  return User.findByPk(id);
}

export async function findByName(name: string) {
  return User.findOne({ where: { name } });
}

export async function createUser(user: CreateUser): Promise<number> {
  return User.create(user).then((data) => data.dataValues.id);
}
