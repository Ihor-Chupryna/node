import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT || 5001,
  DB_URL: process.env.DB_URL || "mongodb://127.0.0.1:27017/myDataBase",

  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "ACCESS",
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "REFRESH",
};
