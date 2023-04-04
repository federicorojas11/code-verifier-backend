import { userEntity } from "../entities/User.entity";
import { LogError, LogSuccess, LogWarning } from "../../logs/logger";
import * as usersMock from "../../mock/people.json";
import { User } from "../../domain/interfaces/user.interface";
import { Auth } from "../interfaces/auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserResponse } from "../types/UserResponse";

// CRUD Requests

/**
 * Method to obtain all users from collection "Users" in MongoDB
 */
export const GetAllUsers = async (
      page: number | undefined,
      limit: number | undefined
): Promise<UserResponse | undefined> => {
      try {
            let userModel = userEntity();
            LogSuccess(`[ORM] get all users`);

            let response: any = {};

            // Search all users
            await userModel

                  .find()
                  .select("name email age")
                  .limit(limit ? limit : -1)
                  .skip((page! - 1) * limit!)
                  .exec()
                  .then((users: User[]) => {
                        response.users = users;
                  });

            // Count total document of users
            await userModel.countDocuments().then((total) => {
                  response.totalPages = Math.ceil(total / limit!);
                  response.currentPage = page;
            });

            return response;

            // return await userModel.find();
      } catch (error) {
            LogError(`[ORM ERROR] Getting all users: ${error}`);
      }
};

export const postAllUsersMock = async () => {
      try {
            let userModel = userEntity();

            return await userModel.insertMany(usersMock);
      } catch (error) {
            LogError(`[ORM ERROR] Post users mock: ${error}`);
      }
};

// Get User by ID
export const getUserById = async (userId: string): Promise<any | undefined> => {
      try {
            let userModel = userEntity();
            LogSuccess(`[ORM] Get user by id ${userId}`);
            // search user by ID

            return await userModel.findById(userId).select("name email age");
      } catch (error) {
            LogError(`[ORM ERROR] Getting user by id: ${error}`);
      }
};

// Delete User by ID
export const deleteUserById = async (
      userId: string
): Promise<any | undefined> => {
      try {
            LogSuccess(`[ORM] Deleting user by id: ${userId}`);
            let userModel = userEntity();
            return await userModel.deleteOne({ _id: userId }); // delete user
      } catch (error) {
            LogError(`[ORM ERROR] Deleting user by id: ${error}`);
      }
};

// Create New User
export const createUser = async (user: User): Promise<any | undefined> => {
      try {
            LogSuccess(`[ORM] create user ${JSON.stringify(user)}`);
            let userModel = userEntity();

            return await userModel.create({
                  name: user.name,
                  email: user.email,
                  age: user.age,
                  password: user.password,
            }); // create user
      } catch (error) {
            LogError(`[ORM ERROR] Creating user: ${error}`);
      }
};

// Update User by ID
export const updateUser = async (
      user: User,
      id: string
): Promise<any | undefined> => {
      try {
            LogSuccess(`[ORM] edit user ${JSON.stringify(user)}`);
            let userModel = userEntity();

            return await userModel.findByIdAndUpdate(id, {
                  name: user.name,
                  email: user.email,
                  age: user.age,
            }); // update user
      } catch (error) {
            LogError(`[ORM ERROR] Updating user: ${error}`);
      }
};

// Logout user
export const logoutUser = async (): Promise<any | undefined> => {};
