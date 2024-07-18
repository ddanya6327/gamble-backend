import SQ, { TINYINT } from "sequelize";
import { sequelize } from "../db/database.js";
const DataTypes = SQ.DataTypes;

export type UserType = {
  id: number;
  name: string;
  nickname: string;
  password: string;
  money: number;
  role: number;
};

const User = sequelize.define("user", {
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
