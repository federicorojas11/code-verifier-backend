import mongoose from "mongoose";
import { Kata } from "../interfaces/katas.interface";

export const katasEntity = () => {
      let katasSchema = new mongoose.Schema({
            name: { type: String, required: true },
            description: { type: String, required: true },
            level: { type: Number, required: true },
            category: { type: String, required: true },
            user: { type: String, required: true },
            date: { type: Date, required: false },
            valoration: { type: Number, required: true },
            chances: { type: Number, required: true },
            participants: { type: Array, required: true },
      });

      return (
            mongoose.models.katas || mongoose.model<Kata>("katas", katasSchema)
      );
};
