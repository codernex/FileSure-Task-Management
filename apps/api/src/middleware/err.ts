import { NextFunction, Request, Response } from "express";
import { IApiError, IApiResponse } from "@codernex/types";
import { ErrorHandler } from "utils/error";

export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response<IApiResponse<IApiError>>,
  _next: NextFunction
) {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Server Error";

  return res.status(err.statusCode).json({
    error: {
      message: err.message,
      statusCode: err.statusCode,
    },
  });
}
