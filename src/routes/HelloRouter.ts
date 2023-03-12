import express, { Request, Response } from "express";
import { HelloController } from "../controller/HelloController";
import { LogInfo } from "../logs/logger";
import { BasicResponse } from "../controller/types";

// Router from express
let helloRouter = express.Router();

// http://localhost:PORT/api/hello/?name=Nombre
helloRouter.route("/").get(async (req: any, res: any) => {
     const name = req.query.name;
     LogInfo(`Query param ${name}`);
     const controller: HelloController = new HelloController();
     const response: BasicResponse = await controller.getMessage(name);
     return res.send(response);
});

export default helloRouter;
