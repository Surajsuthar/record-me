import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  title: string;
  description: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export const GlobalCard = ({ title, description, children, footer }: Props) => {
  return (
    <Card className="bg-transparent mt-4">
      <CardHeader className="p-4">
        <CardTitle className="text-md">{title}</CardTitle>
        <CardDescription className="">{description}</CardDescription>
      </CardHeader>
      {children && <div className="p-4">{children}</div>}
      {footer && <CardFooter className="p-4">{footer}</CardFooter>}
    </Card>
  );
};
