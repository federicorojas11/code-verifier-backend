import { Post, Body, Route, Tags, Get, Query } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogDev, LogSuccessBg } from "../logs/logger";
import { createUser, getUserById } from "../domain/orm/User.orm";
import { User } from "../domain/interfaces/user.interface";
import { Auth } from "../domain/interfaces/auth.interface";

import { logoutUser } from "../domain/orm/User.orm";
import { loginUser, registerUser } from "../domain/orm/Auth.orm";

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

            await loginUser(auth).then((res) => {
                  response = res;
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

      /**
       * Get users
       * Middleware: Validate JWT
       * should receive valid JWT on headers
       * @returns {any} Promise<any>
       */
      @Get("/me")
      public async userData(@Query() id: string): Promise<any> {
            let response: any = "";

            if (id) {
                  LogSuccessBg("GET=>/api/auth/me/:id");
                  response = await getUserById(id);
                  response.password = "";
            }
            return response;
      }
}
