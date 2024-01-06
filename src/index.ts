import express from "express";
import config from "./config";
import router from "./routes";
import { logger } from "./middlewares/logger";

const app = express();

app.use(express.json());

app.use(logger);

app.use("/api", router);

const port = config.app.port;

app.listen(port, () => {
  console.log(`port at ${port}`);
});
