import express, { application } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";

import whitelist from "./config/whitelist";
import { morganOptions } from "./config/morgan";
import log from "./config/log";
import sequelize from "./db/sequelize";
import { toInteger } from "lodash";
import { logCheck } from "./tools/log";
import auth from "./middlewares/auth.handler";
import routerAPI from "./routes";

import UserService from "./services/user.service";
const service = new UserService();

require("dotenv").config();

var app = express();
logCheck();

/***
 * Middlewares
 */
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed"));
    }
  },
};
app.use(cors(corsOptions));
app.use(auth);
app.use(express.json()); // for parsing application/json
//app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan(morganOptions));

toInteger(process.env.API_CREATE_ADMIN) === 1 &&
  (async () => {
    try {
      setTimeout(async () => {
        const user = await service.createfirstUser();
        console.log(`Admin user... OK`);
      }, 10000);
    } catch (error) {
      console.log(`Admin user... FAIL`);
    }
  })();

toInteger(process.env.API_LOG) === 1 &&
  app.use(
    morgan(morganOptions, {
      stream: fs.createWriteStream(log.filePath, { flags: "a" }),
    })
  );

/***
 * Routes
 */
app.post("/db-check", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send(true);
  } catch (error) {
    res.send(false);
  }
});

routerAPI(app);

app.listen(process.env.API_PORT, () => {
  console.log(`Running on port ${process.env.API_PORT}`);
});
