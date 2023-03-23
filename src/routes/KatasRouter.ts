import express, { Request, Response } from "express";
import { LogInfo } from "../logs/logger";
import { BasicResponse } from "../controller/types";
import { KatasController } from "../controller/KatasController";
import { Kata } from "@/models/katas.interface";

// Router from express
let KatasRouter = express.Router();

// http://localhost:PORT/api/katas

KatasRouter.route("/").post(async (req: Request, res: Response) => {
     LogInfo(`Router: Katas route POST`);
     const controller: KatasController = new KatasController();
     let Kata: Kata = {
          name: req.body.name,
          level: req.body.level,
          user: req.body.user,
          description: req.body.description,
          valoration: req.body.valoration,
          chances: req.body.chances,
     };
     const response: BasicResponse = await controller.createKata(Kata);
     return res.send(response);
});

// http://localhost:8000/api/Katas || http://localhost:8000/api/Katas?id=64036794c0afbd2fed7d66d3
KatasRouter.route("/")
     // GET
     .get(async (req: Request, res: Response) => {
          LogInfo(`Router: Katas route GET`);
          const id: any = req?.query?.id; // optional id
          LogInfo(`Query param id: ${id}`);
          const filter: any = req?.query?.dificulty;
          if (filter) LogInfo(`Filter by dificulty n. : ${filter}`);
          const controller: KatasController = new KatasController();

          let response: any;

          if (id) response = await controller.getKatas(id);
          else if (filter)
               response = await controller.getKatas(undefined, filter);
          else response = await controller.getKatas();

          return res.send(response);
     })
     // DELETE
     .delete(async (req: Request, res: Response) => {
          LogInfo(`Router: Katas route DELETE`);
          let id: any = req?.query?.id;
          LogInfo(`Query param: ${id}`);
          const controller: KatasController = new KatasController();
          const response: any = await controller.deleteKataById(id);
          return res.send(response);
     });

// UPDATE
KatasRouter.route("/").put(async (req: Request, res: Response) => {
     LogInfo(`Router: Katas route PUT`);

     const controller: KatasController = new KatasController();
     let Kata: Kata = {
          name: req.body.name,
          level: req.body.level,
          user: req.body.user,
          description: req.body.description,
          valoration: req.body.valoration,
          chances: req.body.chances,
     };

     let id = req?.query?.id;

     LogInfo(`Query param: ${id} and Kata ${JSON.stringify(Kata)}`);
     if (typeof id === "string") {
          const response: BasicResponse = await controller.updateKataById(
               Kata,
               id
          );
          return res.send(response);
     } else return res.send({ message: "Invalid query param" });
});
export default KatasRouter;
