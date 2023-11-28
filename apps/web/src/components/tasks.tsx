import { ITask } from "@codernex/types";
import { useMemo } from "react";
import { Skeleton } from "./skeleton";
import { Task } from "./task";

interface ITasksProps {
  tasks: ITask[];
  isLoading: boolean;
  status: ITask["status"];
  title: string;
}

export const Tasks: React.FC<ITasksProps> = ({
  isLoading,
  status,
  tasks,
  title,
}) => {
  const filteredTask = useMemo(() => {
    return tasks.filter((t) => t.status === status);
  }, [tasks, status]);

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-bold border-b border-b-slate-700 py-3">
        {title} :
      </h2>
      {isLoading ? (
        <Skeleton />
      ) : (
        filteredTask.map((task) => {
          return <Task key={task._id} {...task} />;
        })
      )}
    </div>
  );
};
