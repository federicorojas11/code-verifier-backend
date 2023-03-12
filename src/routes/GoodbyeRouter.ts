import { BasicDateResponse } from "../controller/types";
import express, { Request, Response } from "express";
import { GoodbyeController } from "../controller/GoodbyeController";
import { LogInfo } from "../logs/logger";

// Router from express
let goodbyeRouter = express.Router();

// http://localhost:PORT/api/goodbye/?name=Nombre
goodbyeRouter.route("/").get(async (req: any, res: any) => {
     const name = req.query.name;
     LogInfo(`Query param ${name}`);
     const controller: GoodbyeController = new GoodbyeController();
     const response: BasicDateResponse = await controller.getMessage(name);
     return res.send(response);
});

export default goodbyeRouter;
