import mongoose from "mongoose";

export const userEntity = () => {
     let userSchema = new mongoose.Schema({
          gender: String,
     });

     return mongoose.models.Contacts || mongoose.model("Contacts", userSchema);
};
