"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Loader } from "../loader";
import FolderDuotone from "../icons/folder-duotone";
import React, { useRef, useState } from "react";
import {
  useMutationData,
  userMutationDataState,
} from "@/hooks/useMutationData";
import { renameFolder } from "@/actions/workspace";
import { Input } from "../ui/input";

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
    (data: { name: string }) => renameFolder(id, data.name),
    "workspace-folder",
    Renamed,
  );

  const { latestVariableName } = userMutationDataState(["rename-folder"]);

  const handleFolerclick = () => {
    if (onRename) return;
    router.push(`${pathname}/folder/${id}`);
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    Rename();
    // rename functionality
  };

  const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputRef.current && folderCardRef.current) {
      if (
        !inputRef.current.contains(e.target as Node | null) &&
        !folderCardRef.current.contains(e.target as Node | null)
      ) {
        if (inputRef.current.value) {
          mutate({ name: inputRef.current.value, id });
        } else {
          Renamed();
        }
      }
    }
  };

  return (
    <div
      ref={folderCardRef}
      onClick={handleFolerclick}
      className={cn(
        optimistic && "opacity-60",
        "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg  border-[1px]",
      )}
    >
      <Loader state={false}>
        <div className="flex flex-col gap-[1px]">
          {onRename ? (
            <Input
              onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                updateFolderName(e)
              }
              autoFocus
              placeholder={name}
              className="border-none underline text-base w-full outline-none text-neutral-300 bg-transparent p-0"
              ref={inputRef}
            />
          ) : (
            <p
              className="text-neutral-300"
              onDoubleClick={handleDoubleClick}
              onClick={(e) => e.stopPropagation()}
            >
              {latestVariableName &&
              latestVariableName.status === "pending" &&
              latestVariableName.variables.id === id
                ? latestVariableName.variables.name
                : name}
            </p>
          )}
          <span className="text-sm text-neutral-500">{count || 0} Videos</span>
        </div>
      </Loader>
      <FolderDuotone />
    </div>
  );
};
