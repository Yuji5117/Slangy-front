import { ReactElement } from "react";

type ToolbarProps = {
  children: [ReactElement, ReactElement];
};

export const Toolbar = ({ children }: ToolbarProps) => {
  return (
    <div className="flex justify-between items-center h-10">
      <div className="flex space-x-5 items-center pl-2">{children[0]}</div>
      <div className="space-x-2">{children[1]}</div>
    </div>
  );
};
