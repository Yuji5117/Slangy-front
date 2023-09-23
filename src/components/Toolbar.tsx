import { ReactNode } from "react";

type ToolbarProps = {
  children: ReactNode;
};

const Toolbar = ({ children }: ToolbarProps) => {
  return <div className="flex justify-end items-center h-10">{children}</div>;
};

export default Toolbar;
