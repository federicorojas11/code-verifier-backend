import { BasicDateResponse, BasicResponse } from "../types";

export interface IHelloController {
     getMessage(name?: string): Promise<BasicResponse>;
}

export interface IGoodbyeController {
     getMessage(name?: string): Promise<BasicDateResponse>;
}

export interface IUsersController {
     postAllMockUsers(): Promise<BasicResponse>;
     getUsers(): Promise<any>;
}
