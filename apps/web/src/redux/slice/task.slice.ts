import { ITask } from "@codernex/types";
import { createSlice } from "@reduxjs/toolkit";

interface ITaskState {
  isLoading: boolean;
  tasks: ITask[];
}
const initialState: ITaskState = {
  isLoading: false,
  tasks: [],
};
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    getTasks(state, action) {
      state.isLoading = false;
      state.tasks = action.payload;
    },
    createTask(state, action) {
      state.isLoading = false;
      state.tasks = [...state.tasks, action.payload];
    },
    updateTask(state, action) {
      state.isLoading = false;
      state.tasks = state.tasks.map((task) => {
        if (task._id === action.payload._id) {
          return action.payload;
        }
        return task;
      });
    },
    removeTask(state, action) {
      state.isLoading = false;
      state.tasks = state.tasks.filter(
        (task) => task._id !== action.payload._id
      );
    },
    createTaskErr(state) {
      state.isLoading = false;
    },
    updateTaskErr(state) {
      state.isLoading = false;
    },
    removeTaskErr(state) {
      state.isLoading = false;
    },
  },
});

export default taskSlice.reducer;

export const {
  getTasks,
  startLoading,
  createTask,
  updateTask,
  updateTaskErr,
  createTaskErr,
  removeTask,
  removeTaskErr,
} = taskSlice.actions;
