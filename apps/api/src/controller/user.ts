import { requestHandler } from "helper";
import { createUserSchema } from "@codernex/schema";
import * as bcrypt from "bcryptjs";
import { ApiError } from "@/utils";
import { sendToken } from "utils/authToken";
import { User } from "@/models";
export const createUser = requestHandler(
  async (req, res, next) => {
    try {
      const usernameQuery = User.where({
        username: req.body.username,
      });

      const userNameExist = await usernameQuery.findOne();

      const emailQuery = User.where({
        email: req.body.email,
      });

      const emailExist = await emailQuery.findOne();

      if (userNameExist) {
        return ApiError("User already exist with this username", 404, next);
      }

      if (emailExist) {
        return ApiError("User already exist with this email", 404, next);
      }

      const user = await User.create({
        ...req.body,
      });
      sendToken(res, user, next);
    } catch (err) {
      return ApiError(err.message, 404, next);
    }
  },
  { body: createUserSchema }
);
