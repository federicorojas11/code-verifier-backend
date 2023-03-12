import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { BasicResponse } from "./types";
import { IUsersController } from "./interfaces";
import { LogError, LogSuccessBg } from "../logs/logger";
import {
     createUser,
     deleteUserById,
     GetAllUsers,
     getUserById,
     updateUser,
} from "../domain/orm/User.orm";

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
               LogSuccessBg("[/api/users/:id] Get request");
               response = await getUserById(id);
          } else {
               LogSuccessBg("[/api/users] Get users request");
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
               LogSuccessBg("[/api/users/:id] Delete user request");
               await deleteUserById(id).then(() => {
                    response = { message: `User with id ${id} deleted` };
               });
          } else {
               LogError("[/api/users/:id] delete users request");
               response = { message: "Please provide an user ID" };
          }
          return response;
     }

     /**
      * Create user
      * @returns {any} Promise<any>
      */
     @Post("/")
     public async createUser(@Query() user: any): Promise<any> {
          let response: any = "";

          LogSuccessBg("[/api/users] Create user");
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
          @Query() user: any,
          @Query() id: string
     ): Promise<any> {
          let response: any = "";

          if (id) {
               LogSuccessBg("[/api/users/:id] update user");
               await updateUser(user, id).then(() => {
                    response = {
                         message: `User updated successfully`,
                         user: user,
                    };
               });
          } else {
               LogError("[/api/users/:id] delete users request");
               response = { message: "Please provide an user ID" };
          }
          return response;
     }
}
