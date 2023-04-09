/**
 * Root Router
 * Redirections to Routers
 */

import express from "express";
import helloRouter from "./HelloRouter";
import goodbyeRouter from "./GoodbyeRouter";
import usersRouter from "./UsersRouter";
import katasRouter from "./KatasRouter";
import AuthRouter from "./AuthRouter";
import { LogInfo } from "../logs/logger";

// Body Parser (read body from req)
import bodyParser from "body-parser";

// Server instance
let server = express();

// Router instance
let rootRouter = express.Router();
rootRouter.use(bodyParser.json()); // for parsing application/json
rootRouter.use(bodyParser.urlencoded({ extended: true }));

// Activate for request to http://localhost:8000/api
rootRouter.get("/", (req: any, res: any) => {
      LogInfo("GET: http://localhost:8000/api");
      // send hello world
      res.send(
            "Wellcome to API Restful Express + TS + Nodemon + Jest + Swagger + MONGOOSE"
      );
});

// Redirections to Routers & Controllers
server.use("/", rootRouter);
//localhost:8000/api
server.use("/hello", helloRouter); // http://localhost:8000/api/hello -> HelloRouter
server.use("/goodbye", goodbyeRouter); // http://localhost:8000/api/goodbye -> GoodbyeRouter
server.use("/users", usersRouter); // http://localhost:8000/api/users -> UsersRouter
server.use("/katas", katasRouter); // http://localhost:8000/api/katas -> KatasRouter
server.use("/auth", AuthRouter); // http://localhost:8000/api/auth -> AuthRouter
// Add more routes to the app
export default server;
