import { AppDispatch } from "..";
import api from "../../api";
import { IApiResponse, ITask } from "@codernex/types";
import toast from "react-hot-toast";
import {
  createTask,
  createTaskErr,
  getTasks,
  removeTask,
  removeTaskErr,
  startLoading,
  updateTask as updateTaskData,
  updateTaskErr,
} from "../slice/task.slice";

export const fetchTasks = () => (dispatch: AppDispatch) => {
  dispatch(startLoading());

  api.get("/tasks").then((response) => {
    dispatch(getTasks(response.data.data));
  });
};

export const insertTask =
  (
    data: any,
    setCreateTeamModal: React.Dispatch<React.SetStateAction<boolean>>
  ) =>
  (dispatch: AppDispatch) => {
    dispatch(startLoading());

    api
      .post<IApiResponse<ITask>>("/tasks", data)
      .then((res) => {
        dispatch(createTask(res.data.data));
        toast.success("New Task Created");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error?.message as string);
        dispatch(createTaskErr());
      })
      .finally(() => {
        setCreateTeamModal((prev) => !prev);
      });
  };

export const updateTask =
  (id: string, data: any) => (dispatch: AppDispatch) => {
    dispatch(startLoading());
    api
      .patch<IApiResponse<ITask>>(`/tasks/${id}`, data)
      .then((res) => {
        dispatch(updateTaskData(res.data.data));
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error?.message as string);
        updateTaskErr();
      });
  };

export const deleteTask = (id: string) => (dispatch: AppDispatch) => {
  dispatch(startLoading());
  api
    .delete<IApiResponse<ITask>>(`/tasks/${id}`)
    .then((res) => {
      dispatch(removeTask(res.data.data));
    })
    .catch((err) => {
      toast.error(err?.response?.data?.error?.message as string);
      removeTaskErr();
    });
};
