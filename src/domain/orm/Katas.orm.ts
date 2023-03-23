import { katasEntity } from "../entities/Katas.entity";
import { LogError, LogSuccess } from "../../logs/logger";

// CRUD Requests

/**
 * Method to obtain all katas from collection "katas" in MongoDB
 */

const katasModel = katasEntity();

export const GetAllKatas = async (
     limit?: number
): Promise<any[] | undefined> => {
     try {
          LogSuccess(`[ORM] get all katas`);
          // Search all katas
          return (await limit)
               ? katasModel.find().limit(limit!)
               : katasModel.find();
     } catch (error) {
          LogError(`[ORM ERROR] Getting all katas: ${error}`);
     }
};

export const GetKatasByDificulty = async (
     level: number,
     limit?: number
): Promise<any[] | undefined> => {
     try {
          LogSuccess(`[ORM] get all katas greater than ${level}`);
          // Filter kata by level
          return (await limit)
               ? katasModel.find({ level: { $gt: level } }).limit(limit!)
               : katasModel.find({ level: { $gt: level } });
     } catch (error) {
          LogError(`[ORM ERROR] Getting all katas: ${error}`);
     }
};

// Get Kata by ID
export const getKataById = async (kataId: string): Promise<any | undefined> => {
     try {
          LogSuccess(`[ORM] Get Kata by id ${kataId}`);
          // search kata by ID
          return await katasModel.findById(kataId);
     } catch (error) {
          LogError(`[ORM ERROR] Getting kata by id: ${error}`);
     }
};

// Get Ordered Kata by Valoracion
export const GetKatasOrderedByValue = async (
     orderBy: boolean
): Promise<any | undefined> => {
     try {
          LogSuccess(`[ORM] Get Katas ordered by value ${orderBy}`);
          // search kata by ID
          return await katasModel.find().sort({ valoration: 1 });
     } catch (error) {
          LogError(`[ORM ERROR] Getting Katas ordered by value: ${error}`);
     }
};

// Delete kata by ID
export const deletekataById = async (
     kataId: string
): Promise<any | undefined> => {
     try {
          LogSuccess(`[ORM] Deleting kata by id: ${kataId}`);
          return await katasModel.deleteOne({ _id: kataId }); // delete
     } catch (error) {
          LogError(`[ORM ERROR] Deleting kata by id: ${error}`);
     }
};

// Create New Kata
export const createKata = async (kata: any): Promise<any | undefined> => {
     try {
          LogSuccess(`[ORM] create kata ${JSON.stringify(kata)}`);
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
          return await katasModel.findByIdAndUpdate(id, { kata }); // update
     } catch (error) {
          LogError(`[ORM ERROR] Updating kata: ${error}`);
     }
};
