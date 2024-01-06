import { Knex } from "knex";
import path from "path";

import config from "./config";

const { database: dbConfig } = config;

export const baseKnexConfig = {
  client: dbConfig.client,
  connection: {
    database: dbConfig.database,
    host: dbConfig.host,
    password: dbConfig.password,
    port: dbConfig.port,
    user: dbConfig.user
  }
};

const knexConfig: Knex.Config = {
  ...baseKnexConfig,
  migrations: {
    directory: path.join(__dirname, "database", "migrations"),
    stub: path.join(__dirname, "stubs", "migration.stub"),
    tableName: "migrations"
  },
  seeds: {
    directory: path.join(__dirname, "database", "seeds"),
    stub: path.join(__dirname, "stubs", "seed.stub")
  }
};

export default knexConfig;
