import { ITask, TaskStake } from "@codernex/types";
import { Schema, model, ObjectId } from "mongoose";

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  status: {
    type: String,
    enum: ["TODO", "IN_PROGRESS", "COMPLETED"],
  },
  user_id: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(Date.now()),
  },
  updated_at: {
    type: Date,
    default: new Date(Date.now()),
  },
});

taskSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.status = TaskStake.TODO;
  this.updated_at = new Date(Date.now());
});

export const Task = model("tasks", taskSchema);
