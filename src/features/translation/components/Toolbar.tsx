import { ReactNode } from "react";

type ToolbarProps = {
  children: ReactNode;
};

export const Toolbar = ({ children }: ToolbarProps) => {
  return (
    <div className="flex justify-between items-center h-10">{children}</div>
  );
};
