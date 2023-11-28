import { NextFunction } from "express";

export class ErrorHandler extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);

    Error.captureStackTrace(this);
  }
}

export function ApiError(
  message: string,
  statusCode: number,
  next: NextFunction
) {
  return next(new ErrorHandler(message, statusCode));
}
