import express, { Request, Response } from "express";
import { LogInfo } from "../utils/logger";
import { BasicResponse } from "../controller/types";
import { UsersController } from "@/controller/UsersController";

// Router from express
let usersRouter = express.Router();

// http://localhost:PORT/api/usersmock
usersRouter.route("/").post(async (req: any, res: any) => {
     LogInfo(`SAVE All mock users into database`);
     const controller: UsersController = new UsersController();
     const response: BasicResponse = await controller.postAllMockUsers();
     return res.send(response);
});

export default usersRouter;
