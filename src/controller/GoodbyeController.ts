import { BasicDateResponse } from "./types";
import { IGoodbyeController } from "./interfaces";
import { LogSuccess } from "../logs/logger";

export class GoodbyeController implements IGoodbyeController {
     public async getMessage(
          name?: string | undefined
     ): Promise<BasicDateResponse> {
          LogSuccess("[/api/goodbye] Get request");

          return {
               message: `Goodbye ${name || "world"}!`,
               date: new Date(),
          };
     }
}
