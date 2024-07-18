import dotenv from "dotenv";
dotenv.config();

type Config = {
  host: {
    port: number;
  };
  db: {
    host: string;
    user: string;
    database: string;
    password: string;
  };
  jwt: {
    secretKey: string;
    expiresInSec: number;
  };
  bcrypt: {
    saltRounds: number;
  };
};

export const config: Config = {
  host: {
    port: parseInt(process.env["HOST_PORT"]!),
  },
  db: {
    host: process.env["DB_HOST"]!,
    user: process.env["DB_USER"]!,
    database: process.env["DB_DATABASE"]!,
    password: process.env["DB_PASSWORD"]!,
  },
  jwt: {
    secretKey: process.env["JWT_SECRET"]!,
    expiresInSec: parseInt(process.env["JWT_EXPIRES_SEC"]!),
  },
  bcrypt: {
    saltRounds: parseInt(process.env["BCRYPT_SALT_ROUNDS"]!),
  },
};
