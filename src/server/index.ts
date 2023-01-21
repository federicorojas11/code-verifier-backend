import express, { Express, Request, Response } from "express";
// Security
import cors from "cors";
import helmet from "helmet";
// TODO HTTPS

// Root Router
import rootRouter from "../routes";
import { request } from "http";
import { LogInfo } from "../utils/logger";

// create Express app
const server: Express = express();

// * Define server to use "/api" amd use rootRouter from 'index.ts in routes
// * http://localhost:PORT/api/...
server.use("/api", rootRouter);
b;
// Static server
server.use(express.static("public"));

// TODO Mongoose Connection

// * Security Config
server.use(helmet());
server.use(cors());

// * Content Type Config
server.use(express.urlencoded({ extended: true, limit: "128mb" }));
server.use(express.json({ limit: "128mb" }));

// * Redirections Config
// http:localhost:PORT/ --> http:localhost:PORT/api/
server.get("/", (req: Request, res: Response) => {
     LogInfo("redirect to /api");
     res.redirect("/api");
});

export default server;
