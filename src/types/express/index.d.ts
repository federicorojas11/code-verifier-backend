import express from "express";

declare global {
      namespace Express {
            interface Request {
                  _id?: Record<string, any>;
            }
      }
}
