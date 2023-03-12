import mongoose from "mongoose";

export const userEntity = () => {
     let userSchema = new mongoose.Schema({
          gender: String,
     });

     return mongoose.models.contacts || mongoose.model("contacts", userSchema);
};
