/**
 * Root Router
 * Redirections to Routers
 */

import express from "express";
import helloRouter from "./HelloRouter";
import goodbyeRouter from "./GoodbyeRouter";
import usersRouter from "./UsersRouter";
import { LogInfo } from "../logs/logger";

// Server instance
let server = express();

// Router instance
let rootRouter = express.Router();

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
// Add more routes to the app
export default server;
