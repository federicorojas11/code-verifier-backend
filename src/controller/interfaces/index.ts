import { User } from "../../domain/interfaces/user.interface";
import { BasicDateResponse, BasicResponse } from "../types";
import { Auth } from "../../domain/interfaces/auth.interface";

export interface IHelloController {
      getMessage(name?: string): Promise<BasicResponse>;
}

export interface IGoodbyeController {
      getMessage(name?: string): Promise<BasicDateResponse>;
}

export interface IUsersController {
      getUsers(page: number, limit: number, id?: string): Promise<any>;
      deleteUserById(id?: string): Promise<any>;
      createUser(user: User): Promise<any>;
      updateUserById(user: User, id: string): Promise<any>;
}

export interface IKatasController {
      getKatas(id?: string): Promise<any>;
      deleteKataById(id?: string): Promise<any>;
      createKata(kata: any): Promise<any>;
      updateKataById(kata: any, id: string): Promise<any>;
}

export interface IAuthController {
      registerUser(user: User): Promise<any>;
      loginUser(auth: Auth): Promise<any>;
      logoutUser(auth: Auth): Promise<any>;
      userData(token: string): Promise<any>;
}
