import { config } from "./../../config";
import SQ, { Sequelize } from "sequelize";

const { host, user, database, password } = config.db;
export const sequelize: Sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: "mysql",
  //   logging: false,
});
