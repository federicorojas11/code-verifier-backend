import express, { Request, Response } from "express";
import { LogInfo } from "../logs/logger";
import { BasicResponse } from "../controller/types";
import { KatasController } from "../controller/KatasController";

// Router from express
let KatasRouter = express.Router();

// http://localhost:PORT/api/katas

KatasRouter.route("/").post(async (req: Request, res: Response) => {
     LogInfo(`Router: Katas route POST`);
     const controller: KatasController = new KatasController();
     let Kata = {
          name: {
               title: req?.query?.title as string,
               first: "string",
               last: "string",
          },
          gender: req?.query?.gender as string,
     };
     const response: BasicResponse = await controller.createKata(Kata);
     return res.send(response);
});

// http://localhost:8000/api/Katas || http://localhost:8000/api/Katas?id=64036794c0afbd2fed7d66d3
KatasRouter.route("/")
     // GET
     .get(async (req: Request, res: Response) => {
          LogInfo(`Router: Katas route GET`);
          let id: any = req?.query?.id; // optional id
          LogInfo(`Query param id: ${id}`);
          const controller: KatasController = new KatasController();
          const response: any = await controller.getKatas(id);
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
     let Kata: any = {
          name: {
               title: req?.query?.title as string,
               first: "string",
               last: "string",
          },
          gender: req?.query?.gender as string,
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
