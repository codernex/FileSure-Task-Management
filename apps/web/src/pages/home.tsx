import React, { useEffect } from "react";
import { Button, Tasks, CreateTask } from "../components";
import { useAppDispatch, useTypedSelector } from "../redux";
import { useSetting } from "../context/setting";
import { fetchTasks } from "../redux/actions/task.action";
import { TaskStake } from "@codernex/types";

interface homeProps {}

const Home: React.FC<homeProps> = () => {
  const dispatch = useAppDispatch();
  const { isLoading, tasks } = useTypedSelector((state) => state.task);
  const { authUser, createTaskModal, setCreateTaskModal } = useSetting();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  return (
    <div className="w-full h-screen px-4  xl:px-80 lg:px-40 md:px-20 py-8">
      <CreateTask
        open={createTaskModal}
        setOpen={setCreateTaskModal}
        user_id={authUser?._id}
      />
      <div className="flex justify-end items-center">
        <Button onClick={() => setCreateTaskModal(true)}>
          Create New Task
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-10 mt-8">
        <Tasks
          title="To Do"
          status={TaskStake.TODO}
          isLoading={isLoading}
          tasks={tasks}
        />
        <Tasks
          title="Progressing"
          status={TaskStake.IN_PROGRESS}
          isLoading={isLoading}
          tasks={tasks}
        />
        <Tasks
          title="Completed"
          status={TaskStake.COMPLETED}
          isLoading={isLoading}
          tasks={tasks}
        />
      </div>
    </div>
  );
};
export default Home;
