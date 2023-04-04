import { userEntity } from "../entities/User.entity";
import { LogError, LogSuccess, LogWarning } from "../../logs/logger";
import * as usersMock from "../../mock/people.json";
import { User } from "../../domain/interfaces/user.interface";
import { Auth } from "../interfaces/auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// .env
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.SECRETKEY || "x-MysecretPrivateKey";

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

// Login user
export const loginUser = async (auth: Auth): Promise<any | undefined> => {
      try {
            LogSuccess(`[ORM] login user ${JSON.stringify(auth.email)}`);
            let userModel = userEntity();

            let userFound: User | undefined;
            let token;

            await userModel // find user
                  .findOne({ email: auth.email })
                  .then((user: User) => {
                        userFound = user;
                  })
                  .catch((err) => {
                        LogWarning(`[ORM] User not found`);
                        throw new Error(`[ORM] error: ${err}`);
                  });

            let validPassword = bcrypt.compareSync(
                  auth.password,
                  userFound!.password
            );

            if (!validPassword) {
                  // compare password
                  LogWarning(`[ORM] Password not valid`);
                  throw new Error(`[ORM] Password not valid`);
            }

            // Generate jwt
            token = jwt.sign({ email: userFound!.email }, secret, {
                  expiresIn: "12h",
            });

            return {
                  user: userFound,
                  token: token,
            };
      } catch (error) {
            LogError(`[ORM ERROR] Login user: ${error}`);
      }
};
