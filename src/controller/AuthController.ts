import { Post, Body, Route, Tags } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogDev, LogSuccessBg } from "../logs/logger";
import { createUser } from "../domain/orm/User.orm";
import { User } from "../domain/interfaces/user.interface";
import { Auth } from "../domain/interfaces/auth.interface";

import { loginUser, logoutUser } from "../domain/orm/User.orm";
import { registerUser } from "../domain/orm/Auth.orm";

@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {
      /**
       * Create user
       * @returns {any} Promise<any>
       */
      @Post("/register")
      public async registerUser(@Body() user: User): Promise<any> {
            let response: any = "";

            if (!user) return { message: "User is required" };

            LogSuccessBg("POST=>/api/auth/register");
            LogDev(JSON.stringify(user));

            await registerUser(user).then(() => {
                  response = {
                        message: `User created successfully`,
                        user: user,
                  };
            });

            return response;
      }

      /**
       * Login user
       * @returns {any} Promise<any> -> JWT
       */
      @Post("/login")
      public async loginUser(@Body() auth: Auth): Promise<any> {
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
      public async logoutUser(@Body() auth: Auth): Promise<any> {
            let response: any = "";

            LogSuccessBg("POST=>/api/auth/logout");
            LogDev("Logout " + JSON.stringify(auth.email));

            //   await loginUser(email, password).then(() => {
            //        response = { message: `User created successfully`, user: user };
            //   });

            return await response;
      }
}
