import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { BasicResponse } from "./types";
import { IKatasController } from "./interfaces";
import { LogError, LogSuccessBg } from "../logs/logger";
import {
     createKata,
     GetAllKatas,
     getKataById,
     updateKata,
} from "@/domain/orm/Katas.orm";

@Route("/api/katas")
@Tags("KatasController")
export class KatasController implements IKatasController {
     /**
      * Get katas
      * @returns {any} Promise<any>
      */
     @Get("/")
     public async getKatas(@Query() id?: string): Promise<any> {
          let response: any = "";

          if (id) {
               LogSuccessBg("GET=>/api/katas/:id");
               response = await getKataById(id);
          } else {
               LogSuccessBg("GET=>/api/katas");
               response = await GetAllKatas();
          }
          return response;
     }

     /**
      * Delete kata by id
      * @returns {any} Promise<any>
      */
     @Delete("/")
     public async deleteKataById(@Query() id?: string): Promise<any> {
          let response: any = "";

          if (id) {
               LogSuccessBg("DELETE=>/api/kata/:id");
               await this.deleteKataById(id).then(() => {
                    response = { message: `Kata with id ${id} deleted` };
               });
          } else {
               LogError("DELETE=>/api/kata/:id");
               response = { message: "Please provide an kata ID" };
          }
          return response;
     }

     /**
      * Create kata
      * @returns {any} Promise<any>
      */
     @Post("/")
     public async createKata(@Query() kata: any): Promise<any> {
          let response: any = "";

          LogSuccessBg("POST=>/api/kata");
          await createKata(kata).then(() => {
               response = { message: `Kata created successfully`, kata: kata };
          });

          return response;
     }

     /**
      * Update kata
      * @returns {any} Promise<any>
      */
     @Put("/")
     public async updateKataById(
          @Query() kata: any,
          @Query() id: string
     ): Promise<any> {
          let response: any = "";

          if (id) {
               LogSuccessBg("PUT=>/api/kata/:id");
               await updateKata(kata, id).then(() => {
                    response = {
                         message: `kata updated successfully`,
                         kata: kata,
                    };
               });
          } else {
               LogError("PUT=>/api/katas/:id");
               response = { message: "Please provide an kata ID" };
          }
          return response;
     }
}
