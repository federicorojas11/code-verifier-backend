import { katasEntity } from "../entities/Katas.entity";
import { LogError, LogSuccess } from "../../logs/logger";

// CRUD Requests

/**
 * Method to obtain all katas from collection "katas" in MongoDB
 */
export const GetAllKatas = async (): Promise<any[] | undefined> => {
     try {
          let katasModel = katasEntity();
          LogSuccess(`[ORM] get all katas`);
          // Search all katas
          return await katasModel.find();
     } catch (error) {
          LogError(`[ORM ERROR] Getting all katas: ${error}`);
     }
};

// Get Kata by ID
export const getKataById = async (kataId: string): Promise<any | undefined> => {
     try {
          let katasModel = katasEntity();
          LogSuccess(`[ORM] Get Kata by id ${kataId}`);
          // search kata by ID
          return await katasModel.findById(kataId);
     } catch (error) {
          LogError(`[ORM ERROR] Getting kata by id: ${error}`);
     }
};

// Delete kata by ID
export const deletekataById = async (
     kataId: string
): Promise<any | undefined> => {
     try {
          LogSuccess(`[ORM] Deleting kata by id: ${kataId}`);
          let katasModel = katasEntity();
          return await katasModel.deleteOne({ _id: kataId }); // delete
     } catch (error) {
          LogError(`[ORM ERROR] Deleting kata by id: ${error}`);
     }
};

// Create New Kata
export const createKata = async (kata: any): Promise<any | undefined> => {
     try {
          LogSuccess(`[ORM] create kata ${JSON.stringify(kata)}`);
          let katasModel = katasEntity();
          return await katasModel.create({ kata }); // create
     } catch (error) {
          LogError(`[ORM ERROR] Creating kata: ${error}`);
     }
};

// Update Kata by ID
export const updateKata = async (
     kata: any,
     id: string
): Promise<any | undefined> => {
     try {
          LogSuccess(`[ORM] edit kata`);
          let katasModel = katasEntity();
          return await katasModel.findByIdAndUpdate(id, { kata }); // update
     } catch (error) {
          LogError(`[ORM ERROR] Updating kata: ${error}`);
     }
};
