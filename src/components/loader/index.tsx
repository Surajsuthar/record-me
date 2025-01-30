import React from "react";
import { Spinner } from "./spinner";
import { cn } from "@/lib/utils";

interface LoaderProps {
  state: boolean;
  className?: string;
  color?: string;
  children?: React.ReactNode;
}

export const Loader = ({ state, className, color, children }: LoaderProps) => {
  return state ? (
    <div className={cn(className)}>
      <Spinner color={color} />
    </div>
  ) : (
    children
  );
};
