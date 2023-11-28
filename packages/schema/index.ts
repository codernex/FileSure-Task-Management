import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(4, { message: "Name must be atleast 4 characters" }),
  username: z
    .string()
    .min(4, { message: "Username must be atleast 4 characters" }),
});
export const loginSchema = z.object({
  emailOrUserName: z
    .string()
    .min(4, { message: "Username must be atleast 4 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Task Name must be atleast 4 characters" }),
  description: z
    .string()
    .min(4, { message: "Description must be atleast 4 characters" }),
  user_id: z.string(),
});

export const updateTaskSchema = z.object({
  state: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
});
