import { createUser } from "@/controller";
import express, { Router } from "express";

export const userRoutes: Router = express.Router();

userRoutes.route("/").post(createUser);
