import { userEntity } from "../entities/User.entity";
import { LogError, LogSuccess } from "@/utils/logger";

// CRUD Requests

/**
 * Method to obtain all users from collection "Users" in MongoDB
 */
export const GetAllUsers = async (): Promise<any[] | undefined> => {
     try {
          let userModel = userEntity();

          // Search all users
          return await userModel.find({ isDelete: false });
     } catch (error) {
          LogError(`[ORM ERROR] Getting all users: ${error}`);
     }
};

// TODO
// Get User by ID
// Get User by email
// Delete User by ID
// Create New User
// Update User by ID
