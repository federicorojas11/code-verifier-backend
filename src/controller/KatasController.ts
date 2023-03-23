import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IKatasController } from "./interfaces";
import { LogError, LogSuccessBg } from "../logs/logger";
import {
     createKata,
     GetAllKatas,
     getKataById,
     GetKatasByDificulty,
     updateKata,
} from "../domain/orm/Katas.orm";
import { Kata } from "../models/katas.interface";

@Route("/api/katas")
@Tags("KatasController")
export class KatasController implements IKatasController {
     /**
      * Get katas
      * @returns {any} Promise<any>
      */
     @Get("/")
     public async getKatas(
          @Query() id?: string,
          @Query() dificulty?: string
     ): Promise<any> {
          let response: any = "";

          if (id) {
               LogSuccessBg("GET=>/api/katas/:id");
               response = await getKataById(id);
          } else if (dificulty) {
               LogSuccessBg(`GET=>/api/katas?dificulty=${dificulty}`);
               response = await GetKatasByDificulty(parseInt(dificulty));
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
     public async createKata(@Query() kata: Kata): Promise<any> {
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
          @Query() kata: Kata,
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

// Debes poder obtener las 5 Katas más recientes

// Debes poder listar las Katas ordenadas de mejor valoradas a menos valoradas

// Debes poder valorar una Kata con una nueva nota y debe almacenarse la media

// Por lo que el modelo de Kata deberá tener un valor que será número de valoraciones de usuarios, para así obtener la media

// Debes poder encontrar las Katas ordenadas por intentos
