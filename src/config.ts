import dotenv from "dotenv";

const pathToEnv = __dirname + "/../.env";

dotenv.config({ path: pathToEnv });

const config = {
  app: {
    port: process.env.PORT || 3000
  },
  bcrypt: {
    saltRounds: +(process.env.SALT_ROUNDS || 10)
  },
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "accesstoken",
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "1d"
  },
  database: {
    charset: "utf8",
    client: process.env.DB_CLIENT || "pg",
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    timezone: "UTC",
    user: process.env.DB_USER
  }
};

export default config;
