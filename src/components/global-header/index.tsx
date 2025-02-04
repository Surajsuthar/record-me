"use client";
import { WorkSpace } from "@prisma/client";
import { usePathname } from "next/navigation";

interface Props {
  workspace: WorkSpace;
}

export const GlobleHeader = ({ workspace }: Props) => {
  const pathname = usePathname().split(`/dashboar/${workspace.id}`)[1];

  return (
    <article className="flex flex-col gap-2">
      <span className="text-sm text-[#707070]">
        {workspace.type.toLocaleUpperCase()}
      </span>
      <h1 className="text-4xl font-bold">
        {pathname && pathname.includes("folder")
          ? pathname.charAt(0).toUpperCase() + pathname.slice(1).toLowerCase()
          : "My Libary"}
      </h1>
    </article>
  );
};
