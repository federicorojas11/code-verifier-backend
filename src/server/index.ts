import express, { Express, Request, Response } from "express";
// Security
import cors from "cors";
import helmet from "helmet";
// Swagger
import swaggerUi from "swagger-ui-express";

// TODO HTTPS

// Root Router
import rootRouter from "../routes";
import { request } from "http";
import { LogInfo } from "../logs/logger";
import mongoose from "mongoose";

// create Express app
const server: Express = express();

// * Swagger config and route
server.use(
     "/swagger",
     swaggerUi.serve,
     swaggerUi.setup(undefined, {
          swaggerOptions: { url: "/swagger.json", explorer: true },
     })
);

// * Define server to use "/api" amd use rootRouter from 'index.ts in routes
// * http://localhost:PORT/api/...
server.use("/api", rootRouter);

// Static server
server.use(express.static("public"));

// MongoDB connection
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/Pruebas");

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
