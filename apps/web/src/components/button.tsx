import React from "react";
import { cn } from "../utils";
import { Processing } from ".";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, loading, children, type, ...props }, ref) => {
    return (
      <button
        className={cn("bg-indigo-500 rounded-md w-[150px] h-[40px]", className)}
        ref={ref}
        type={type}
        {...props}
      >
        {loading ? <Processing /> : children}
      </button>
    );
  }
);
