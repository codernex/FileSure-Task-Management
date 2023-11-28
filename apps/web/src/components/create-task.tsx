import { Dialog, DialogContent, DialogTitle } from "./dialog";
import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormMessage,
  Button,
  Form,
} from ".";
import { DialogHeader } from "./dialog";
import { z } from "zod";
import { createTaskSchema } from "@codernex/schema";
import { useAppDispatch } from "../redux";
import { insertTask } from "../redux/actions/task.action";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

interface CreateTaskProps {
  user_id: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

type CreateTaskData = z.infer<typeof createTaskSchema>;
export const CreateTask: React.FC<CreateTaskProps> = React.memo(
  ({ open, setOpen, user_id }) => {
    console.log(user_id);

    const form = useForm<CreateTaskData>({
      defaultValues: {
        description: "",
        title: "",
        user_id: user_id,
      },
      resolver: zodResolver(createTaskSchema),
    });
    const dispatch = useAppDispatch();
    const onSubmit = (data: CreateTaskData) => {
      form.reset();

      dispatch(insertTask(data, setOpen));
    };
    return (
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogContent className="bg-slate-200">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Task Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Task Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
                control={form.control}
                name="title"
              />
              <FormField
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Task Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Task Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
                control={form.control}
                name="description"
              />
              <Button className="text-white" type="submit">
                Create
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
);
