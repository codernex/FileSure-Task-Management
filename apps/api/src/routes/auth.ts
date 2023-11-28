import { loginUser, refreshAuth } from "@/controller";
import express, { Router } from "express";

export const authRoutes: Router = express.Router();

authRoutes.post("/", loginUser);
authRoutes.post("/refresh", refreshAuth);
