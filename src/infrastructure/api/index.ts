import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import express from "express";
import { RegisterRoutes } from "../../../build/routes";
import swaggerDocs from "../../../build/swagger.json";

import config from "./api.config";
import { errorHandler } from "./error-handler";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(errorHandler)

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
RegisterRoutes(app);

const server = app.listen(config.port, () => {
  console.log(`Listening at http://localhost:${config.port}`);
});
server.on("error", console.error);
