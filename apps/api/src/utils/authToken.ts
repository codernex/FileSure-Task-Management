import sanitizedConfig from "config";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "./error";
import { IApiResponse, IUser } from "@codernex/types";

export const sendToken = (
  res: Response<IApiResponse<any>>,
  user: IUser,
  next: NextFunction
) => {
  const token = jwt.sign(
    { sub: user._id, email: user.email, username: user.username },
    sanitizedConfig.JWT_SECRET,
    {
      expiresIn: 1000 * 60 * 60,
    }
  );

  const refreshToken = jwt.sign(
    { sub: user._id, email: user.email, username: user.username },
    sanitizedConfig.REFRESH_SECRET,
    {
      expiresIn: "1d",
    }
  );

  if (!token || !refreshToken) {
    return ApiError(
      "Please Login Again There are some unexpected error",
      404,
      next
    );
  }

  res.status(200).json({
    data: {
      user: user,
      accessToken: token,
      refreshToken,
    },
  });
};
