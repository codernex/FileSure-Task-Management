import React, { useCallback } from "react";

interface IAvatar {
  src?: string;
}

export const Avatar: React.FC<IAvatar> = React.memo(({ src }) => {
  const getInitials = useCallback((name?: string) => {
    if (name)
      return (
        name.split(" ")[0][0].toUpperCase() +
        name.split(" ")[1][0].toUpperCase()
      );
    else return "??";
  }, []);
  return (
    <div className="bg-slate-700 w-8 h-8 flex items-center justify-center rounded-full">
      {getInitials(src)}
    </div>
  );
});
