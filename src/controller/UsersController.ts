import { Post, Route, Tags } from "tsoa";
import { BasicResponse } from "./types";
import { IUsersController } from "./interfaces";
import { LogSuccess } from "../utils/logger";

@Route("/api/mockusers")
@Tags("UsersController")
export class UsersController implements IUsersController {
     /**
      * Save mock data users
      * @returns {BasicResponse} Promise<BasicResponse>
      */
     @Post("/")
     public async postAllMockUsers(): Promise<BasicResponse> {
          LogSuccess("[/api/mockusers] Post request");

          return {
               message: `All users saved into db!`,
          };
     }
}
