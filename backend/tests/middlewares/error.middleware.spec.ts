import { describe, expect, it, vi } from "vitest";
import { AppError } from "../../src/app/errors/app-error";
import { errorMiddleware } from "../../src/app/middlewares/error.middleware";
import { NextFunction, Request, Response } from "express";

describe("ErrorMiddleware", () => {
  it("should return appropriate error response for AppError", () => {
    const error = new AppError({ statusCode: 404, message: "Not Found" });
    const req = {} as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    const next = {} as NextFunction;

    errorMiddleware(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ statusCode: 404, message: "Not Found" });
  });

  it("should return 500 status for non-AppError errors", () => {
    const error = new Error("Some error");
    const req = {} as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    const next = {} as NextFunction;

    errorMiddleware(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ statusCode: 500, message: "internal server error" });
  });
});
