import { userEntity } from "../entities/User.entity";
import { LogError, LogSuccess } from "../../logs/logger";
import * as usersMock from "../../mock/people.json";
import { User } from "../../domain/interfaces/user.interface";
import { Auth } from "../interfaces/auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register New User
export const registerUser = async (user: User): Promise<any | undefined> => {
      try {
            LogSuccess(`[ORM] create user ${JSON.stringify(user)}`);
            let userModel = userEntity();
            return await userModel.create({ ...user }); // create user
      } catch (error) {
            LogError(`[ORM ERROR] Creating user: ${error}`);
      }
};
