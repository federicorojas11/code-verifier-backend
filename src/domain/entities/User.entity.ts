import mongoose from "mongoose";
import { User } from "../interfaces/user.interface";

export const userEntity = () => {
     // let userSchema = new mongoose.Schema({
     //      name: String,
     //      email: String,
     //      age: String,
     // });

     let userSchema = new mongoose.Schema<User>({
          name: { type: String, required: true },
          email: { type: String, required: true },
          age: { type: String, required: true },
     });

     return mongoose.models.users || mongoose.model<User>("users", userSchema);
};
