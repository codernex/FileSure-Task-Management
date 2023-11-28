import { createTaskSchema } from "@codernex/schema";
import { requestHandler } from "helper";
import { Task } from "@/models";
import { ApiError } from "utils/error";
import { z } from "zod";

export const createTask = requestHandler(
  async (req, res, next) => {
    try {
      const task = new Task({ ...req.body });

      await task.save();

      res.status(200).json({
        data: task,
      });
    } catch (err) {
      return ApiError(err.message, 400, next);
    }
  },
  {
    body: createTaskSchema,
  }
);

export const updateTask = requestHandler(
  async (req, res, next) => {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        {
          $set: { ...req.body },
        },
        { new: true }
      );

      res.status(200).json({
        data: task,
      });
    } catch (err) {
      return ApiError(err.message, 400, next);
    }
  },
  {
    body: createTaskSchema,
    params: z.object({
      id: z.string(),
    }),
  }
);

export const removeTask = requestHandler(
  async (req, res, next) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);

      console.log(task);

      res.status(200).json({
        data: task,
      });
    } catch (err) {
      return ApiError(err.message, 400, next);
    }
  },
  {
    params: z.object({
      id: z.string(),
    }),
  }
);

export const getTask = requestHandler(async (req, res, next) => {
  try {
    const query = Task.where({
      user_id: req.user?._id,
    });

    const tasks = await query.find();

    res.status(200).json({
      data: tasks,
    });
  } catch (err) {
    return ApiError(err.message, 400, next);
  }
});
