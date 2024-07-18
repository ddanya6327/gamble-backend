import { sequelize } from "../db/database";
import { DataTypes, Model, Optional } from "sequelize";

interface UserAttributes {
  id: number;
  name: string;
  nickname: string;
  password: string;
  money?: number;
  role?: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export type CreateUser = {
  name: string;
  nickname: string;
  password: string;
};

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public nickname!: string;
  public password!: string;
  public money!: number;
  public role!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
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
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
  }
);

export async function findById(id: number): Promise<User | null> {
  return User.findByPk(id);
}

export async function findByName(name: string): Promise<User | null> {
  return User.findOne({ where: { name } });
}

export async function createUser(user: CreateUser): Promise<number> {
  return User.create(user).then((data) => data.dataValues.id);
}
