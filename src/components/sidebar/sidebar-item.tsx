import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  icon: React.ReactNode;
  href: string;
  selected: boolean;
  notification: number;
}

export const SidebarItem = ({
  title,
  icon,
  href,
  selected,
  notification,
}: Props) => {
  return (
    <li className="cursor-pointer my-[5px] w-full">
      <Link
        href={href}
        className={cn(
          "flex items-center justify-between group rounded-lg w-full",
          selected ? "bg-neutral-200" : "",
        )}
      >
        <div className="flex items-center justify-between gap-3 transition-all p-[5px] cursor-pointer">
          {icon}
          <span
            className={cn(
              "font-medium group-hover:text-neutral-800 transition-all truncate w-32 text-sm",
              selected ? "text-neutral-800" : "text-neutral-500",
            )}
          >
            {title}
          </span>
        </div>
        {notification}
      </Link>
    </li>
  );
};
