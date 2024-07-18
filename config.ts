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
};
