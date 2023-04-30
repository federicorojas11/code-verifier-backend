import express, { Request, Response } from "express";
import { LogDev, LogInfo } from "../logs/logger";
import { BasicResponse } from "../controller/types";
import { UsersController } from "../controller/UsersController";
import { User } from "../domain/interfaces/user.interface";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import bcrypt from "bcrypt";

// Implement body read from request
import bodyParser from "body-parser";
import { Kata, KataCategory } from "../domain/interfaces/katas.interface";
let jsonParser = bodyParser.json();

// Router from express
let usersRouter = express.Router();

// http://localhost:PORT/api/users

usersRouter
      .route("/")
      .post(verifyToken, jsonParser, async (req: Request, res: Response) => {
            LogInfo(`Router: Users route POST`);
            const controller: UsersController = new UsersController();

            // Obtain the hashed password
            let hashed = bcrypt.hashSync(req?.body?.password, 8);

            let user: User = {
                  name: req?.body?.name,
                  email: req?.body?.email,
                  age: req?.body?.age,
                  password: hashed,
                  katas: [],
            };
            const response: BasicResponse = await controller.createUser(user);
            return res.status(201).send(response);
      });

// http://localhost:8000/api/users || http://localhost:8000/api/users?id=64036794c0afbd2fed7d66d3
usersRouter
      .route("/")
      // GET
      .get(verifyToken, async (req: Request, res: Response) => {
            LogInfo(`Router: Users route GET`);

            let id: any = req?.query?.id;
            LogInfo(`Query param id: ${id}`);

            let page: any = req?.query?.page;
            LogInfo(`Query param page: ${page}`);

            let limit: any = req?.query?.limit;
            LogInfo(`Query param limit: ${limit}`);

            const controller: UsersController = new UsersController();
            const response: any = await controller.getUsers(
                  page || 1,
                  limit || 10,
                  id
            );
            return res.status(200).send(response);
      })
      // DELETE
      .delete(verifyToken, async (req: Request, res: Response) => {
            LogInfo(`Router: Users route DELETE`);
            let id: any = req?.query?.id;
            LogInfo(`Query param: ${id}`);
            const controller: UsersController = new UsersController();
            const response: any = await controller.deleteUserById(id);
            return res.status(204).send(response);
      });

// UPDATE
usersRouter.route("/").put(verifyToken, async (req: Request, res: Response) => {
      LogInfo(`Router: Users route PUT`);

      const controller: UsersController = new UsersController();
      let user: User = {
            name: req?.query?.name as string,
            email: req?.query?.email as string,
            age: req?.query?.age as string,
            password: req?.body?.password as string,
            katas: req?.body?.katas as any,
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

// http://localhost:8000/api/users/katas || http://localhost:8000/api/users/katas?id=64036794c0afbd2fed7d66d3
usersRouter
      .route("/katas")
      // GET
      .get(verifyToken, async (req: Request, res: Response) => {
            LogInfo(`Router: Users route GET Katas`);

            let id: any = req?.query?.id;
            if (id) LogInfo(`Query param id: ${id}`);

            let page: any = req?.query?.page;
            LogInfo(`Query param page: ${page}`);

            let limit: any = req?.query?.limit;
            LogInfo(`Query param limit: ${limit}`);

            let orderByLevel: any = req?.query?.orderbylevel;
            if (orderByLevel)
                  LogInfo(`Query param orderbylevel: ${orderByLevel}`);

            let filterByLevel: any = req?.query?.filterbylevel;
            if (filterByLevel)
                  LogInfo(`Query param filterbylevel: ${filterByLevel}`);

            let orderByValoration: any = req?.query?.orderbyvaloration;
            if (orderByValoration)
                  LogInfo(
                        `Query param orderbyvaloration: ${orderByValoration}`
                  );

            let filterByValoration: any = req?.query?.filterbyvaloration;
            if (filterByValoration)
                  LogInfo(
                        `Query param filterbyvaloration: ${filterByValoration}`
                  );

            const controller: UsersController = new UsersController();
            const response: any = await controller.getKatas(
                  id,
                  page,
                  limit,
                  orderByLevel,
                  filterByLevel,
                  orderByValoration,
                  filterByValoration
            );
            return res.status(200).send(response);
      });

// http://localhost:8000/api/users/katas
usersRouter
      .route("/katas")
      // POST
      .post(verifyToken, async (req: Request, res: Response) => {
            LogInfo(`Router: Users route POST Katas`);

            let {
                  name,
                  level,
                  category,
                  description,
                  valoration,
                  chances,
                  participants,
            } = req.body;

            let Kata: Kata = {
                  name: name,
                  level: level,
                  category: category || KataCategory.BASIC,
                  description: description || "",
                  valoration: valoration || [1],
                  chances: chances || 1,
                  participants: participants || [],
                  creator: req._id, // set user that created this kata
            };

            const controller: UsersController = new UsersController();
            const response: any = await controller.createKata(Kata);
            return res.status(200).send(response);
      });

// http://localhost:8000/api/users/katas/valorate
usersRouter
      .route("/katas/valorate")
      // POST
      .post(verifyToken, async (req: Request, res: Response) => {
            LogInfo(`Router: Users route POST new valoration for kata`);

            let { id, valoration } = req.body;

            const controller: UsersController = new UsersController();
            const response: any = await controller.valorationKata(
                  valoration,
                  id
            );
            return res.status(200).send(response);
      });

export default usersRouter;
