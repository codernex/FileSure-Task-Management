import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../../.env") });

interface Env {
  PORT?: number;
  JWT_SECRET?: string;
  DATABASE_URL?: string;
  REFRESH_SECRET?: string;
  NODE_ENV?: string;
}

type Config = {
  [T in keyof Env]-?: T extends "NODE_ENV"
    ? "development" | "production"
    : Env[T];
};

// Loading process.env as ENV interface

const getConfig = (): Env => {
  return {
    PORT: process.env.API_PORT ? Number(process.env.API_PORT) : undefined,
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    REFRESH_SECRET: process.env.REFRESH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitizedConfig = (config: Env): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
