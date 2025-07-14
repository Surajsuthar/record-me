import React from "react";

interface Props {
  children: React.ReactNode;
}

export const WorkSpacePlaceholder = ({ children }: Props) => {
  return (
    <span className="bg-neutral-200 flex items-center justify-center font-bold w-8 px-2 h-7 rounded-sm text-neutral-800">
      {children}
    </span>
  );
};
