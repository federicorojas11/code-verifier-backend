import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { BasicResponse } from "./types";
import { IUsersController } from "./interfaces";
import { LogDev, LogError, LogSuccessBg } from "../logs/logger";
import {
     createUser,
     deleteUserById,
     GetAllUsers,
     getUserById,
     updateUser,
} from "../domain/orm/User.orm";
import { User } from "../domain/interfaces/user.interface";

@Route("/api/users")
@Tags("UsersController")
export class UsersController implements IUsersController {
     /**
      * Get users
      * @returns {any} Promise<any>
      */
     @Get("/")
     public async getUsers(@Query() id?: string): Promise<any> {
          let response: any = "";

          if (id) {
               LogSuccessBg("GET=>/api/users/:id");
               response = await getUserById(id);
          } else {
               LogSuccessBg("GET=>/api/users");
               response = await GetAllUsers();
          }
          return response;
     }

     /**
      * Delete user by id
      * @returns {any} Promise<any>
      */
     @Delete("/")
     public async deleteUserById(@Query() id?: string): Promise<any> {
          let response: any = "";

          if (id) {
               LogSuccessBg("DELETE=>/api/users/:id");
               await deleteUserById(id).then(() => {
                    response = { message: `User with id ${id} deleted` };
               });
          } else {
               LogError("DELETE=>/api/users/:id");
               response = { message: "Please provide an user ID" };
          }
          return response;
     }

     /**
      * Create user
      * @returns {any} Promise<any>
      */
     @Post("/")
     public async createUser(@Query() user: User): Promise<any> {
          let response: any = "";

          if (!user) return response;

          LogSuccessBg("POST=>/api/users");
          LogDev(JSON.stringify(user));
          await createUser(user).then(() => {
               response = { message: `User created successfully`, user: user };
          });

          return response;
     }

     /**
      * Update user
      * @returns {any} Promise<any>
      */
     @Put("/")
     public async updateUserById(
          @Query() user: User,
          @Query() id: string
     ): Promise<any> {
          let response: any = "";

          if (id) {
               LogSuccessBg("PUT=>/api/users/:id");
               await updateUser(user, id).then(() => {
                    LogSuccessBg("User updated");
                    response = {
                         message: `User updated successfully`,
                         user: user,
                         status: 204,
                    };
               });
          } else {
               LogError("PUT=>/api/users/:id");
               response = { message: "Please provide an user ID", status: 400 };
          }
          return response;
     }
}
