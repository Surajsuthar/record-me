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
    <li className="cursor-pointer my-[5px]">
      <Link
        href={href}
        className={cn(
          "flex items-center justify-center group rounded-lg bg-[#1D1D1D]",
          selected ? "bg-[#1d1d1d]" : "",
        )}
      >
        <div className="flex items-center justify-start gap-2 transition-all p-[5px] cursor-pointer">
          {icon}
          <span
            className={cn(
              "font-medium group-hover:text-[#9d9d9d] transition-all truncate w-32 ",
              selected ? "text-[#9d9d9d]" : "text-[#545454s]",
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
