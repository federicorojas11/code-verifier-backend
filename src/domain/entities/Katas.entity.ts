import mongoose from "mongoose";

export const katasEntity = () => {
     let katasSchema = new mongoose.Schema({
          name: String,
          description: String,
          level: Number,
          user: String,
          date: Date,
          valoration: Number,
          chances: Number,
     });

     return mongoose.model("Katas", katasSchema);
};
