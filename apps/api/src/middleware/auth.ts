import { requestHandler } from "helper";
import { IApiError, IApiResponse } from "@codernex/types";
import { ApiError } from "@/utils";
import * as jwt from "jsonwebtoken";
import sanitizedConfig from "config";
import { User } from "models/user";
export const isAuthenticated = requestHandler<
  unknown,
  unknown,
  unknown,
  IApiResponse<IApiError | any>
>(async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return ApiError("No valid token found", 404, next);
    }

    const decodedData = jwt.verify(
      token,
      sanitizedConfig.JWT_SECRET
    ) as jwt.JwtPayload;

    const user = await User.findById(decodedData.sub);

    if (!user) {
      return ApiError("User not found", 404, next);
    }

    req.user = user;

    next();
  } catch (err: any) {
    console.log(err);

    return ApiError(err.message, 404, next);
  }
});
