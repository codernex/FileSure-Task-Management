import { Router } from "express";
import { isAuthenticated } from "@/middleware";
import { createTask, getTask, removeTask, updateTask } from "controller/task";

export const taskRoute = Router() as Router;

taskRoute.route("/").get(getTask).post(createTask);
taskRoute.route("/:id").patch(updateTask).delete(removeTask);
