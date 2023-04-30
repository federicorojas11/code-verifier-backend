import { Body, Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { BasicResponse } from "./types";
import { IUsersController } from "./interfaces";
import { LogDev, LogError, LogInfo, LogSuccessBg } from "../logs/logger";
import {
      createUser,
      addValorationKata,
      deleteUserById,
      GetAllUsers,
      GetKatasFromUser,
      getUserById,
      updateUser,
      createUserKata,
} from "../domain/orm/User.orm";
import { User } from "../domain/interfaces/user.interface";
import { Kata } from "../domain/interfaces/katas.interface";

@Route("/api/users")
@Tags("UsersController")
export class UsersController implements IUsersController {
      /**
       * Get katas
       * @returns {any} Promise<any>
       */
      @Get("/katas") // /users/katas?id=XXXXXX
      public async getKatas(
            @Query() id: string,
            @Query() page?: number,
            @Query() limit?: number,
            @Query() orderByLevel?: number,
            @Query() filterByLevel?: number,
            @Query() orderByValoration?: number,
            @Query() filterByValoration?: number
      ): Promise<any> {
            let response: any = "";

            if (id) {
                  LogSuccessBg("GET=>/api/users/katas?id=XXXXXX");
                  response = await GetKatasFromUser(
                        id,
                        page,
                        limit,
                        orderByLevel,
                        filterByLevel,
                        orderByValoration,
                        filterByValoration
                  );
            } else {
                  LogError("CONTROLLER [id not found]");
                  response = {
                        message: "Please provide an user ID",
                        status: 400,
                  };
            }
            return response;
      }

      /**
       * Get users
       * @returns {any} Promise<any>
       */
      @Get("/")
      public async getUsers(
            @Query() page?: number,
            @Query() limit?: number,
            @Query() id?: string
      ): Promise<any> {
            let response: any = "";

            if (id) {
                  LogSuccessBg("GET=>/api/users/:id");
                  response = await getUserById(id);
            } else {
                  LogSuccessBg("GET=>/api/users");
                  response = await GetAllUsers(page, limit);
            }
            LogInfo(response);
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
      public async createUser(@Body() user: User): Promise<any> {
            let response: any = "";

            if (!user) return response;

            LogSuccessBg("POST=>/api/users");
            LogDev(JSON.stringify(user));
            await createUser(user).then(() => {
                  response = {
                        message: `User created successfully`,
                        user: user,
                  };
            });

            return response;
      }

      /**
       * Update user
       * @returns {any} Promise<any>
       */
      @Put("/")
      public async updateUserById(
            @Body() user: User,
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
                  response = {
                        message: "Please provide an user ID",
                        status: 400,
                  };
            }
            return response;
      }

      /**
       * Create kata
       * @returns {any} Promise<any>
       */
      @Post("/")
      public async createKata(@Query() kata: Kata): Promise<any> {
            let response: any = "";

            LogSuccessBg("POST=>/api/kata");
            await createUserKata(kata).then((r) => {
                  response = {
                        message: `Kata created successfully`,
                        kata: kata,
                  };
            });

            return response;
      }

      /**
       * Create kata valoration
       * @returns {any} Promise<any>
       */
      @Post("/")
      public async valorationKata(
            @Query() valoration: number,
            @Query() kataId: string
      ): Promise<any> {
            let response: any = "";

            LogSuccessBg("POST=>/api/kata");
            await addValorationKata(valoration, kataId).then((r) => {
                  response = {
                        message: `Kata created successfully`,
                        kata: r,
                  };
            });

            return response;
      }
}
