import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface Props {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  title: string;
  description: string;
}

export const Model = ({
  children,
  trigger,
  className,
  title,
  description,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger className={className} asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
