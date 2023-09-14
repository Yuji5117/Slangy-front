import { ReactNode } from "react";

type ToolbarProps = {
  children: ReactNode;
};

const Toolbar = ({ children }: ToolbarProps) => {
  return <div className="flex justify-end">{children}</div>;
};

export default Toolbar;
