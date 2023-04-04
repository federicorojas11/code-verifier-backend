import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();
const secret = process.env.SECRETKEY || "x-MysecretPrivateKey";

/**
 *
 * @param {Request}req Original request previous to verification JWT
 * @param {Response} res Response to verification JWT
 * @param {NextFunction} next next function to be executed
 * @returns Error || next()
 */
export const verifyToken = (
      req: Request,
      res: Response,
      next: NextFunction
) => {
      // Check headers from request for 'x-access-token'
      let token: any = req.headers["x-access-token"];

      // Verify if jwt exists
      if (!token) {
            return res.status(403).send({
                  auth: "failed - missing jwt in request header",
                  message: "Token not found!",
            });
      }

      // Verify the token
      jwt.verify(token, secret, (err: any, decoded: any) => {
            if (err) {
                  return res.status(500).send({
                        auth: "not allowed",
                        message: "Request not allowed!",
                  });
            }

            // Execute next function => Protected Routes will be executed
            next();
      });
};
