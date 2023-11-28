import { Link, useLocation } from "react-router-dom";
import { useSetting } from "../context/setting";
import { cn } from "../utils";

const nav = [
  {
    title: "Team",
    path: "team",
  },
  {
    title: "Tasks",
    path: "tasks",
  },
];

const Sidebar = () => {
  const { sidebarOpen, screenWidth } = useSetting();
  const { pathname } = useLocation();

  return (
    <div
      className={cn(
        "w-72 h-full min-h-screen px-4 py-4 bg-slate-800",
        screenWidth <= 768 && !sidebarOpen && "hidden"
      )}
    >
      <Link to={"/"} className="text-xl font-semibold cursor-pointer">
        Codernex
      </Link>

      <ul className="space-y-3 mt-3 flex flex-col">
        {nav.map((item, i) => {
          return (
            <Link
              className={cn(
                "hover:bg-slate-700 duration-300 transition-colors px-3 py-1 rounded-md",
                item.title.toLowerCase() === pathname?.slice(1)
                  ? "bg-slate-700"
                  : ""
              )}
              to={item.title.toLowerCase()}
              key={i}
            >
              {item.title}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
export default Sidebar;
