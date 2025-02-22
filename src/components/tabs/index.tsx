import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

interface Props {
  defaultvalue: string;
  children: React.ReactNode;
  triggers: string[];
}

export const TabMenu = ({ defaultvalue, children, triggers }: Props) => {
  return (
    <Tabs defaultValue={defaultvalue} className="w-full">
      <TabsList className="flex justify-start bg-transparent">
        {triggers.map((trigger) => (
          <TabsTrigger
            key={trigger}
            value={trigger}
            className=" capitalize text-base data-[state=active]:bg-[#1d1d1d]"
          />
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
};
