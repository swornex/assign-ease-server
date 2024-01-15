import pg from "pg";
import dayjs from "dayjs";
import camelCase from "camelize";
import knex, { Knex } from "knex";
import toSnakeCase from "to-snake-case";

import { baseKnexConfig } from "./knexFile";

// PostgreSQL date OID
const DATE_OID = 1082;
const TIMESTAMP_OID = 1114;
const TIMESTAMPTZ_OID = 1184;

// Set custom type parsers
pg.types.setTypeParser(DATE_OID, (d) => dayjs(d).format("YYYY-MM-DD"));
pg.types.setTypeParser(TIMESTAMP_OID, (d) => dayjs(d).format());
pg.types.setTypeParser(TIMESTAMPTZ_OID, (d) => dayjs(d).format());

const knexConfig: Knex.Config = {
  ...baseKnexConfig,
  connection: {
    ...baseKnexConfig.connection
  },
  wrapIdentifier: (value: string, origImpl: (value: string) => string) => {
    if (value === "*") {
      return origImpl(value);
    }

    return origImpl(toSnakeCase(value));
  },
  postProcessResponse: (result) => {
    return camelCase(result);
  }
};

export default knex(knexConfig);
