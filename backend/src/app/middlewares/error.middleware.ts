import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error";

export const errorMiddleware = <E extends Error>(
  error: E,
  _: Request,
  response: Response,
  __: NextFunction,
) => {
  console.log(error);

  if (error instanceof AppError)
    return response.status(error.statusCode).json({ statusCode: error.statusCode, message: error.message });

  return response.status(500).json({ statusCode: 500, message: "internal server error" });
};
