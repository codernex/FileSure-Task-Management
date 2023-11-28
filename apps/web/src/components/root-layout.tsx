import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export const RootLayout = () => {
  return (
    <main className="w-full h-full min-h-screenscrollbar-hide bg-slate-800 text-white">
      <Navbar />
      <div className="overflow-y-scroll scrollbar-hide">
        <Outlet />
      </div>
    </main>
  );
};
