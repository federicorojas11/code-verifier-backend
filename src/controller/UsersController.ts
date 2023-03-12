import { Get, Post, Query, Route, Tags } from "tsoa";
import { BasicResponse } from "./types";
import { IUsersController } from "./interfaces";
import { LogSuccess } from "../logs/logger";
import { GetAllUsers, getUserById } from "../domain/orm/User.orm";

@Route("/api/users")
@Tags("UsersController")
export class UsersController implements IUsersController {
     /**
      * Save mock data users
      * @returns {BasicResponse} Promise<BasicResponse>
      */
     @Post("/")
     public async postAllMockUsers(): Promise<BasicResponse> {
          LogSuccess("[/api/users] Post request");

          return {
               message: `All users saved into db!`,
          };
     }

     /**
      * Get users
      * @returns {any} Promise<any>
      */
     @Get("/")
     public async getUsers(@Query() id?: string): Promise<any> {
          let response: any = "";

          if (id) {
               LogSuccess("[/api/users/:id] Get request");

               response = await getUserById(id);
          } else {
               LogSuccess("[/api/users] Get users request");
               response = await GetAllUsers();
          }
          return response;
     }
}
