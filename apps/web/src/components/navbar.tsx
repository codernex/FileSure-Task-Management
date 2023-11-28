import { AiOutlineLogout } from "react-icons/ai";
import { Button } from ".";
import { useSetting } from "../context/setting";
import { Avatar } from "./avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useSignOut } from "react-auth-kit";
const Navbar = () => {
  const { authUser } = useSetting();

  const signOut = useSignOut();

  const logout = () => {
    signOut();
  };

  return (
    <div className="px-4 xl:px-80 lg:px-40 md:px-20 py-2 border-b-[1px] border-b-slate-700 flex">
      <div className="flex-1 flex justify-between items-center">
        <span className="text-xl font-semibold">FileSure Task</span>
        <Popover>
          <PopoverTrigger asChild>
            <span className="text-white">
              <Avatar src={authUser?.name} />
            </span>
          </PopoverTrigger>
          <PopoverContent className="bg-white flex flex-col items-center h-[200px] justify-center">
            <Button
              onClick={() => logout()}
              className="flex items-center justify-center gap-x-3 text-white"
            >
              <AiOutlineLogout /> <span>Logout</span>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
