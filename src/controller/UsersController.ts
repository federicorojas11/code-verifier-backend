import { Get, Post, Route, Tags } from "tsoa";
import { BasicResponse } from "./types";
import { IUsersController } from "./interfaces";
import { LogSuccess } from "../utils/logger";
import { GetAllUsers } from "../domain/orm/User.orm";

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
     public async getUsers(): Promise<any> {
          LogSuccess("[/api/users] Get users request");
          const response = await GetAllUsers();
          return response;
     }
}
