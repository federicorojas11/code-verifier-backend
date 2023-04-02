import express, { Request, Response } from "express";
import { LogDev, LogInfo } from "../logs/logger";
import { BasicResponse } from "../controller/types";
import { UsersController } from "../controller/UsersController";
import { User } from "@/domain/interfaces/user.interface";
import bcrypt from "bcrypt";
import { AuthController } from "@/controller/AuthController";
import { Auth } from "@/domain/interfaces/auth.interface";

// Router from express
let authRouter = express.Router();

// http://localhost:PORT/api/auth/...

authRouter.route("/auth/register").post(async (req: Request, res: Response) => {
     LogInfo(`Router: Users /auth/register route POST`);

     const controller: AuthController = new AuthController();
     let { name, email, password, age } = req.body;
     if (!name) {
          return res.status(400).send({ message: "Nombre es requerido" });
     }
     if (!email) {
          return res.status(400).send({ message: "Email es requerido" });
     }
     if (!age) {
          return res.status(400).send({ message: "Age es requerido" });
     }
     if (!password) {
          return res.status(400).send({ message: "Password es requerido" });
     }

     // Obtain the hashed password
     let hashed = bcrypt.hashSync(password, 83);

     let user: User = {
          name: name,
          email: email,
          password: hashed,
          age: age,
     };
     const response: BasicResponse = await controller.registerUser(user);
     return res.status(201).send(response);
});

authRouter.route("/auth/login").post(async (req: Request, res: Response) => {
     LogInfo(`Router: Users /auth/login route POST`);

     const controller: AuthController = new AuthController();
     let { email, password } = req.body;

     if (!email) {
          return res.status(400).send({ message: "Email es requerido" });
     }
     if (!password) {
          return res.status(400).send({ message: "Password es requerido" });
     }

     let auth: Auth = { email: email, password: password };
     const response: BasicResponse = await controller.loginUser(auth);
     return res.status(200).send(response); // -> includes JWT on response
});

export default authRouter;
