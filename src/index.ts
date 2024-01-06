import express from "express";
import config from "./config";
import router from "./routes";
import { logger } from "./middlewares/logger";
import { genericErrorHandler, notFoundError } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use(logger);

app.use("/api", router);

app.use(genericErrorHandler);
app.use(notFoundError);

const port = config.app.port;

app.listen(port, () => {
  console.log(`port at ${port}`);
});
