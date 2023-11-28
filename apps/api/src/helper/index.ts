import { IApiResponse } from "@codernex/types";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "@/utils";
import { ZodSchema } from "zod";
import { generateErrorMessage, ErrorMessageOptions } from "zod-error";
import { IUser } from "@codernex/types";

/**
 *
 * @param handler An Express Request Handler Function
 * @param config An Optional Object That Takes Zod Schema as Request Query, Body, Params To Validate
 * @returns Promise<void> | Promise<NextFunction>
 */

export const requestHandler = <
  TQuery,
  TBody,
  TParams,
  TResponse = IApiResponse<any>
>(
  handler: (
    req: Request<TParams, any, TBody, TQuery> & { user?: IUser },
    res: Response<TResponse>,
    next: NextFunction
  ) => Promise<void> | Promise<NextFunction>,
  config?: {
    query?: ZodSchema<TQuery>;
    params?: ZodSchema<TParams>;
    body?: ZodSchema<TBody>;
  }
) => {
  return (
    req: Request<TParams, any, TBody, TQuery> & { user?: IUser },
    res: Response,
    next: NextFunction
  ) => {
    const options: ErrorMessageOptions = {
      delimiter: {
        error: " \n ",
      },
      transform: ({ errorMessage, index }) => `${errorMessage}`,
    };

    if (config?.body) {
      const result = config.body.safeParse(req.body);

      if (!result.success) {
        const errorMessage = generateErrorMessage(result.error.issues, options);

        return ApiError(errorMessage, 404, next);
      }
    }

    if (config?.query) {
      const result = config.query.safeParse(req.query);
      if (!result.success) {
        const errorMessage = generateErrorMessage(result.error.issues, options);

        return ApiError(errorMessage, 404, next);
      }
    }

    if (config?.params) {
      const result = config.params.safeParse(req.params);
      if (!result.success) {
        const errorMessage = generateErrorMessage(result.error.issues, options);

        return ApiError(errorMessage, 404, next);
      }
    }

    Promise.resolve(handler(req, res, next));
  };
};
