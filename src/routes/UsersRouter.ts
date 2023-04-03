import express, { Request, Response } from "express";
import { LogDev, LogInfo } from "../logs/logger";
import { BasicResponse } from "../controller/types";
import { UsersController } from "../controller/UsersController";
import { User } from "../domain/interfaces/user.interface";
import bcrypt from "bcrypt";

// Implement body read from request
import bodyParser from "body-parser";
let jsonParser = bodyParser.json();

// Router from express
let usersRouter = express.Router();

// http://localhost:PORT/api/users

usersRouter.route("/").post(jsonParser, async (req: Request, res: Response) => {
      LogInfo(`Router: Users route POST`);
      const controller: UsersController = new UsersController();

      // Obtain the hashed password
      let hashed = bcrypt.hashSync(req?.body?.password, 8);

      let user: User = {
            name: req?.body?.name,
            email: req?.body?.email,
            age: req?.body?.age,
            password: hashed,
      };
      const response: BasicResponse = await controller.createUser(user);
      return res.status(201).send(response);
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
            return res.status(200).send(response);
      })
      // DELETE
      .delete(async (req: Request, res: Response) => {
            LogInfo(`Router: Users route DELETE`);
            let id: any = req?.query?.id;
            LogInfo(`Query param: ${id}`);
            const controller: UsersController = new UsersController();
            const response: any = await controller.deleteUserById(id);
            return res.status(204).send(response);
      });

// UPDATE
usersRouter.route("/").put(async (req: Request, res: Response) => {
      LogInfo(`Router: Users route PUT`);

      const controller: UsersController = new UsersController();
      let user: User = {
            name: req?.query?.name as string,
            email: req?.query?.email as string,
            age: req?.query?.age as string,
            password: req?.body?.password as string,
      };
      let id = req?.query?.id;

      LogInfo(`Query param: ${id} and user ${JSON.stringify(user)}`);
      if (typeof id === "string") {
            const response: BasicResponse = await controller.updateUserById(
                  user,
                  id
            );

            return res.status(response.status).send(response);
      } else
            return res.status(400).send({
                  message: "Invalid query param. User id is required.",
            });
});

export default usersRouter;
