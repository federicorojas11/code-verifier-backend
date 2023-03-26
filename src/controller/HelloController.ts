import { Get, Query, Route, Tags } from "tsoa";
import { BasicResponse } from "./types";
import { IHelloController } from "./interfaces";
import { LogSuccess } from "../logs/logger";

@Route("/api/hello")
@Tags("HelloController")
export class HelloController implements IHelloController {
     /**
      * Endpoint to retreive a message "Hello {name}" in JSON
      * @param {string | undefined} name Name of user to be greeted
      * @returns {BasicResponse} Promise<BasicResponse>
      */
     @Get("/")
     public async getMessage(
          @Query()
          name?: string
     ): Promise<BasicResponse> {
          LogSuccess("[/api/hello] Get request");

          return {
               message: `Hello ${name || "world"}!`,
               status: 200,
          };
     }
}
