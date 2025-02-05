"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Loader } from "../loader";
import FolderDuotone from "../icons/folder-duotone";
import React, { useRef, useState } from "react";
import { useMutationData } from "@/hooks/useMutationData";
import { renameFolder } from "@/actions/workspace";

interface Props {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
}

export const Folder = ({ name, id, optimistic, count }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const folderCardRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [onRename, setOnRename] = useState(false);

  const Rename = () => setOnRename(true);
  const Renamed = () => setOnRename(false);

  //add loading state
  //optimistic ui

  const { mutate, isPending } = useMutationData(
    ["rename-folder"],
    (data: { name: string }) => renameFolder(id, name),
    "workspace-folder",
    Renamed,
  );

  const handleFolerclick = () => {
    router.push(`${pathname}/folder/${id}`);
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    // rename functionality
  };

  return (
    <div
      onClick={handleFolerclick}
      className={cn(
        "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg  border-[1px]",
      )}
    >
      <Loader state={false}>
        <div className="flex flex-col gap-[1px]">
          <p className="text-neutral-300" onDoubleClick={handleDoubleClick}>
            {name}
          </p>
          <span className="text-sm text-neutral-500">{count || 0} Videos</span>
        </div>
      </Loader>
      <FolderDuotone />
    </div>
  );
};
