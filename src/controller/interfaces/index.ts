import { User } from "@/models/user.interface";
import { BasicDateResponse, BasicResponse } from "../types";

export interface IHelloController {
     getMessage(name?: string): Promise<BasicResponse>;
}

export interface IGoodbyeController {
     getMessage(name?: string): Promise<BasicDateResponse>;
}

export interface IUsersController {
     getUsers(id?: string): Promise<any>;
     deleteUserById(id?: string): Promise<any>;
     createUser(user: User): Promise<any>;
     updateUserById(user: User, id: string): Promise<any>;
}
