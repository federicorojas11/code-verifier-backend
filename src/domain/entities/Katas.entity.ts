import mongoose from "mongoose";
import { Kata } from "../interfaces/katas.interface";

export const katasEntity = () => {
      let katasSchema = new mongoose.Schema({
            name: { type: String, required: true },
            description: { type: String, required: true },
            level: { type: Number, required: true },
            category: { type: String, required: true },
            date: { type: Date, required: false },
            valoration: { type: Array, required: true },
            chances: { type: Number, required: true },
            participants: { type: Array, required: true },
            creator: { type: String, required: true },
            solution: { type: String, required: false },
      });

      return (
            mongoose.models.katas || mongoose.model<Kata>("katas", katasSchema)
      );
};
