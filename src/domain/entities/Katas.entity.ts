import mongoose from "mongoose";
import { Kata } from "../interfaces/katas.interface";

export const katasEntity = () => {
      let katasSchema = new mongoose.Schema({
            name: String,
            description: String,
            level: Number,
            category: String,
            user: String,
            date: Date,
            valoration: Number,
            chances: Number,
            participants: Array,
      });

      return mongoose.model("Katas", katasSchema);
};
