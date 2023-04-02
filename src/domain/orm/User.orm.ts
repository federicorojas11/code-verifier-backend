import { userEntity } from "../entities/User.entity";
import { LogError, LogSuccess } from "../../logs/logger";
import * as usersMock from "../../mock/people.json";
import { User } from "../../domain/interfaces/user.interface";
import { Auth } from "../interfaces/auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// CRUD Requests

/**
 * Method to obtain all users from collection "Users" in MongoDB
 */
export const GetAllUsers = async (): Promise<any[] | undefined> => {
     try {
          let userModel = userEntity();
          LogSuccess(`[ORM] get all users`);
          // Search all users
          return await userModel.find();
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
          return await userModel.findById(userId);
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
          return await userModel.create({ user }); // create user
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

// Register user
export const registerUser = async (user: User): Promise<any | undefined> => {};

// Login user
export const loginUser = async (auth: Auth): Promise<any | undefined> => {
     try {
          LogSuccess(`[ORM] login user ${JSON.stringify(auth.email)}`);
          let userModel = userEntity();

          return await userModel.findOne(
               {
                    email: auth.email,
               },
               (err: any, user: User) => {
                    if (err) {
                         // Error 500
                    }
                    if (!user) {
                         // Error 404
                    }

                    let validPassword = bcrypt.compareSync(
                         auth.password,
                         user.password!
                    );
                    if (!validPassword) {
                         // Error 401
                    }

                    // Create JWT
                    let token = jwt.sign(
                         { email: user.email },
                         "x-MysecretPrivateKey",
                         { expiresIn: "12hs" }
                    );

                    return token;
               }
          );
     } catch (error) {
          LogError(`[ORM ERROR] Login user: ${error}`);
     }
};

// Logout user
export const logoutUser = async (): Promise<any | undefined> => {};
