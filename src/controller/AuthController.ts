import { Post, Query, Route, Tags } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogDev, LogSuccessBg } from "../logs/logger";
import { createUser } from "../domain/orm/User.orm";
import { User } from "../domain/interfaces/user.interface";
import { Auth } from "@/domain/interfaces/auth.interface";

import { registerUser, loginUser, logoutUser } from "../domain/orm/User.orm";

@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {
     /**
      * Create user
      * @returns {any} Promise<any>
      */
     @Post("/register")
     public async registerUser(@Query() user: User): Promise<any> {
          let response: any = "";

          if (!user) return { message: "User is required" };

          LogSuccessBg("POST=>/api/auth/register");
          LogDev(JSON.stringify(user));
          await createUser(user).then(() => {
               response = { message: `User created successfully`, user: user };
          });

          return response;
     }

     /**
      * Login user
      * @returns {any} Promise<any> -> JWT
      */
     @Post("/login")
     public async loginUser(@Query() auth: Auth): Promise<any> {
          let response: any = "";

          if (!auth) return { message: "Email and password required" };

          LogSuccessBg("POST=>/api/auth/login");
          LogDev("Login " + JSON.stringify(auth.email));

          await loginUser(auth).then((r) => {
               response = {
                    message: `User logged successfully`,
                    user: auth.email,
                    token: "x",
               };
          });

          return response;
     }

     /**
      * Logout user
      * @returns {any} Promise<any>
      */
     @Post("/logout")
     public async logoutUser(@Query() auth: Auth): Promise<any> {
          let response: any = "";

          LogSuccessBg("POST=>/api/auth/logout");
          LogDev("Logout " + JSON.stringify(auth.email));

          //   await loginUser(email, password).then(() => {
          //        response = { message: `User created successfully`, user: user };
          //   });

          return await response;
     }
}
