import express, { Request, Response } from "express";
import { LogInfo } from "../utils/logger";
import { BasicResponse } from "../controller/types";
import { UsersController } from "../controller/UsersController";

// Router from express
let usersRouter = express.Router();

// http://localhost:PORT/api/users

usersRouter.route("/").post(async (req: any, res: any) => {
     LogInfo(`Users route POST:: `);
     const controller: UsersController = new UsersController();
     const response: BasicResponse = await controller.postAllMockUsers();
     return res.send(response);
});

usersRouter.route("/").get(async (req: any, res: any) => {
     LogInfo(`Users route GET:: `);
     const controller: UsersController = new UsersController();
     const response: any = await controller.getUsers();
     return res.send(response);
});

export default usersRouter;
