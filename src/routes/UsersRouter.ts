import express, { Request, Response } from "express";
import { LogInfo } from "../logs/logger";
import { BasicResponse } from "../controller/types";
import { UsersController } from "../controller/UsersController";

// Router from express
let usersRouter = express.Router();

// http://localhost:PORT/api/users

usersRouter.route("/").post(async (req: Request, res: Response) => {
     LogInfo(`Users route POST:: `);
     const controller: UsersController = new UsersController();
     const response: BasicResponse = await controller.postAllMockUsers();
     return res.send(response);
});

// http://localhost:8000/api/users || http://localhost:8000/api/users?id=64036794c0afbd2fed7d66d3
usersRouter
     .route("/")
     // GET
     .get(async (req: Request, res: Response) => {
          LogInfo(`Users route GET::`);
          let id: any = req?.query?.id; // optional id
          LogInfo(`Query param name: ${id}`);
          const controller: UsersController = new UsersController();
          const response: any = await controller.getUsers(id);
          return res.send(response);
     })
     // DELETE
     .delete(async (req: Request, res: Response) => {
          let id: any = req?.query?.id;
          LogInfo(`Query param: ${id}`);
          const controller: UsersController = new UsersController();
          // const response: any = await controller.getUsers(id);
          return res.send({ message: `Deleting user with ID ${id}` });
     });

export default usersRouter;
