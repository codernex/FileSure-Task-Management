import React, { createContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { AuthStateUserObject } from "react-auth-kit/dist/types";

interface ISettingContext {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  screenWidth: number;
  authUser: AuthStateUserObject | null;
  createTaskModal: boolean;
  setCreateTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingContext = createContext<ISettingContext>({
  sidebarOpen: true,
  setSidebarOpen: () => {},
  screenWidth: window.innerWidth,
  authUser: null,
  createTaskModal: true,
  setCreateTaskModal: () => {},
});

const SettingProvider = ({ children }: React.PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [windowSize, setWindow] = useState<number>(window.innerWidth);
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const authUser = useAuthUser()();
  useEffect(() => {
    const handleWindowResize = () => {
      setWindow(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize < 768) {
      setSidebarOpen(false);
    }
  }, [windowSize]);

  return (
    <SettingContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        screenWidth: windowSize,
        authUser,
        createTaskModal,
        setCreateTaskModal,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default SettingProvider;

export const useSetting = () => React.useContext(SettingContext);
