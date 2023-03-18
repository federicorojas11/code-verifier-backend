import express, { Request, Response } from "express";
import { LogInfo } from "../logs/logger";
import { BasicResponse } from "../controller/types";
import { UsersController } from "../controller/UsersController";
import { User } from "@/models/user.interface";

// Router from express
let usersRouter = express.Router();

// http://localhost:PORT/api/users

usersRouter.route("/").post(async (req: Request, res: Response) => {
     LogInfo(`Router: Users route POST`);
     const controller: UsersController = new UsersController();
     let user = {
          name: {
               title: req?.query?.title as string,
               first: "string",
               last: "string",
          },
          gender: req?.query?.gender as string,
     };
     const response: BasicResponse = await controller.createUser(user);
     return res.send(response);
});

// http://localhost:8000/api/users || http://localhost:8000/api/users?id=64036794c0afbd2fed7d66d3
usersRouter
     .route("/")
     // GET
     .get(async (req: Request, res: Response) => {
          LogInfo(`Router: Users route GET`);
          let id: any = req?.query?.id; // optional id
          LogInfo(`Query param id: ${id}`);
          const controller: UsersController = new UsersController();
          const response: any = await controller.getUsers(id);
          return res.send(response);
     })
     // DELETE
     .delete(async (req: Request, res: Response) => {
          LogInfo(`Router: Users route DELETE`);
          let id: any = req?.query?.id;
          LogInfo(`Query param: ${id}`);
          const controller: UsersController = new UsersController();
          const response: any = await controller.deleteUserById(id);
          return res.send(response);
     });

// UPDATE
usersRouter.route("/").put(async (req: Request, res: Response) => {
     LogInfo(`Router: Users route PUT`);

     const controller: UsersController = new UsersController();
     let user: User = {
          name: {
               title: req?.query?.title as string,
               first: "string",
               last: "string",
          },
          gender: req?.query?.gender as string,
     };

     let id = req?.query?.id;

     LogInfo(`Query param: ${id} and user ${JSON.stringify(user)}`);
     if (typeof id === "string") {
          const response: BasicResponse = await controller.updateUserById(
               user,
               id
          );
          return res.send(response);
     } else return res.send({ message: "Invalid query param" });
});
export default usersRouter;
