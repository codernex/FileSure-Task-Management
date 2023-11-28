import { ITask, TaskStake } from "@codernex/types";
import { cn } from "../utils";
import { AiOutlineDelete, AiOutlineMore } from "react-icons/ai";
import React, { useState } from "react";
import { Dialog, DialogContent } from "./dialog";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from ".";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { deleteTask, updateTask } from "../redux/actions/task.action";
import { useAppDispatch } from "../redux";

export const Task: React.FC<ITask> = (task) => {
  const [showToolBox, setShowToolbox] = useState(false);
  const handleToggleToolbox = () => {
    setShowToolbox(true);
  };
  const dispatch = useAppDispatch();

  return (
    <div>
      <TaskUpdate open={showToolBox} setOpen={setShowToolbox} task={task} />
      <div className="flex justify-between px-2 py-2 bg-slate-600 rounded-md items-center">
        <p>{task.title}</p>
        <p
          className={cn(
            task.status === "TODO"
              ? "text-red-500"
              : task.status === "IN_PROGRESS"
              ? "text-yellow-500"
              : "text-green-500",
            "capitalize"
          )}
        >
          {task.status}
        </p>
        <div className="flex gap-2 items-center">
          <AiOutlineDelete
            onClick={() => dispatch(deleteTask(task._id))}
            className="text-slate-300 text-2xl cursor-pointer"
          />
          <AiOutlineMore
            className="text-slate-300 text-2xl cursor-pointer"
            onClick={handleToggleToolbox}
          />
        </div>
      </div>
    </div>
  );
};

interface TaskUpdateProps {
  task: ITask;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskUpdate: React.FC<TaskUpdateProps> = React.memo(
  ({ open, setOpen, task }) => {
    const form = useForm<typeof task>({
      defaultValues: {
        title: task.title,
        description: task.description,
        status: task.status,
        user_id: task.user_id,
      },
    });
    const dispatch = useAppDispatch();

    const onSubmit = (data: any) => {
      dispatch(updateTask(task._id, data));
      setOpen(false);
    };

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className=" bg-white">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex space-y-3 flex-col"
            >
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Task Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="title"
                control={form.control}
              />
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Task Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="description"
                control={form.control}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {Object.keys(TaskStake).map((key) => {
                          return (
                            <SelectItem key={key} value={key} children={key} />
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="text-white" type="submit">
                Update Task
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
);
