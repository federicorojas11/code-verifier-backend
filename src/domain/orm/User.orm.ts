import { userEntity } from "../entities/User.entity";
import {
      LogError,
      LogInfo,
      LogSuccess,
      LogSuccessBg,
      LogWarning,
} from "../../logs/logger";
import * as usersMock from "../../mock/people.json";
import { User } from "../../domain/interfaces/user.interface";
import { UserResponse } from "../types/UserResponse";
import { katasEntity } from "../entities/Katas.entity";
import { Kata } from "../interfaces/katas.interface";

const katasModel = katasEntity();
const userModel = userEntity();

// CRUD Requests

/**
 * Method to obtain all users from collection "Users" in MongoDB
 */
export const GetAllUsers = async (
      page: number | undefined,
      limit: number | undefined
): Promise<UserResponse | undefined> => {
      try {
            LogSuccess(`[ORM] get all users`);

            let response: any = {};

            // Search all users
            await userModel
                  .find()
                  .select("name email age katas")
                  .limit(limit ? limit : 999)
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
            return await userModel.insertMany(usersMock);
      } catch (error) {
            LogError(`[ORM ERROR] Post users mock: ${error}`);
      }
};

// Get User by ID
export const getUserById = async (userId: string): Promise<any | undefined> => {
      try {
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
            return await userModel.deleteOne({ _id: userId }); // delete user
      } catch (error) {
            LogError(`[ORM ERROR] Deleting user by id: ${error}`);
      }
};

// Create New User
export const createUser = async (user: User): Promise<any | undefined> => {
      try {
            LogSuccess(`[ORM] create user ${JSON.stringify(user)}`);

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

/**
 * Method to obtain all users from collection "Users" in MongoDB
 */
export const GetKatasFromUser = async (
      id: string,
      page: number | undefined,
      limit: number | undefined,
      orderByLevel: number | undefined,
      filterByLevel: number | undefined,
      orderByValoration: number | undefined,
      filterByValoration: number | undefined
): Promise<UserResponse | undefined> => {
      try {
            LogSuccess(`[ORM] get all katas from user`);

            let response: any = {};

            await userModel
                  .findById(id)
                  .select("name email age katas")
                  .limit(limit ? limit : -1)
                  .skip((page! - 1) * limit!)
                  .exec()
                  .then(async (user: User) => {
                        LogInfo(`USER FOUND ${user}`);

                        let filterCriteria: {} = {
                              _id: { $in: user.katas! },
                        };

                        if (filterByValoration)
                              filterCriteria = {
                                    ...filterCriteria,
                                    valoration: filterByValoration,
                              };

                        if (filterByLevel)
                              filterCriteria = {
                                    ...filterCriteria,
                                    level: filterByLevel,
                              };

                        let sortCriteria = {};

                        if (orderByValoration)
                              sortCriteria = {
                                    ...sortCriteria,
                                    valoration: orderByValoration,
                              };

                        if (orderByLevel)
                              sortCriteria = {
                                    ...sortCriteria,
                                    level: orderByLevel,
                              };

                        return await katasModel
                              .find(filterCriteria)
                              .sort(sortCriteria)
                              .then((katas: Kata[]) => {
                                    response.user = user;
                                    response.katas = katas;
                              });
                  })
                  .catch((error) => {
                        LogError(`[ORM ERROR] find user error: ${error}`);
                  });

            // Count total document of users
            await userModel.countDocuments().then((total) => {
                  response.totalPages = Math.ceil(total / limit!);
                  response.currentPage = page;
            });

            return response;
      } catch (error) {
            LogError(`[ORM ERROR] Obtain katas from user: ${error}`);
      }
};

// Create New Kata from User
export const createUserKata = async (kata: any): Promise<any | undefined> => {
      try {
            let createKata = await katasModel
                  .create({ ...kata }) // create
                  .then(async (_kata) => {
                        let updateUser = await userModel.updateOne(
                              { _id: kata.creator },
                              { $push: { katas: _kata._id } }
                        );
                        LogSuccess(
                              `[ORM] User update: ${JSON.stringify(updateUser)}`
                        );

                        return _kata;
                  });

            LogSuccess(`[ORM] create kata ${JSON.stringify(createKata)}`);

            return createKata;
      } catch (error) {
            LogError(`[ORM ERROR] Creating kata: ${error}`);
      }
};

// Valorate kata
export const addValorationKata = async (
      valoration: number,
      kataId: string
): Promise<any | undefined> => {
      try {
            const kata = await katasModel.findByIdAndUpdate(kataId, {
                  $push: { valoration: valoration },
            }); // update user

            // * set updated valoration response
            let valorations = kata.valoration;
            valorations.push(valoration);

            // * assign to new response
            let kataBuffer = { ...kata }._doc;
            const response = {
                  ...kataBuffer,
                  valoration: valorations,
            };

            LogSuccess(
                  `[ORM] edited kata valoration ${JSON.stringify(response)}`
            );

            return response;
      } catch (error) {
            LogError(`[ORM ERROR] Updating valoration: ${error}`);
      }
};

// Add kata solution
export const addORMKataSolution = async (
      solution: string,
      kataId: string
): Promise<any | undefined> => {
      try {
            const kata = await katasModel.findByIdAndUpdate(kataId, {
                  solution: solution,
            }); // add kata solution

            // * create response object
            const response = {
                  _id: kata._id,
                  name: kata.name,
                  solution: solution,
            };

            LogSuccess(`[ORM] added solution ${JSON.stringify(response)}`);

            return response;
      } catch (error) {
            LogError(`[ORM ERROR] Adding solution: ${error}`);
      }
};

// Update user kata
export const updateORMUserKata = async (
      kata: Kata,
      kataId: string,
      userId: string
): Promise<any | undefined> => {
      try {
            return await katasModel.findById(kataId).then(async (kataFound) => {
                  if (kataFound.creator !== userId) {
                        return {
                              error: "La kata solo puede ser editada por su usuario creador",
                        };
                  }

                  const response = await katasModel.findByIdAndUpdate(
                        kataId,
                        kata
                  );
                  LogSuccess(`[ORM] updated kata ${JSON.stringify(response)}`);
                  return response;
            });
      } catch (error) {
            LogError(`[ORM ERROR] Updating kata: ${error}`);
            return {
                  error: "La kata no pudo ser actualizada porque no se ha encontrado, o hubo un error en la base de datos",
            };
      }
};
