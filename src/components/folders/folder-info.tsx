"use client";
import { getFolderInfo } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { FolderProps } from ".";
import { FolderProp } from "@/types";

interface Props {
  folderId: string;
}

export const FolderInfo = ({ folderId }: Props) => {
  const { data } = useQueryData(["folder-info"], () => getFolderInfo(folderId));
  const { data: folder } = data as FolderProp;
  return (
    <div className="flex items-center">
      <h2 className="text-[#dbdbdb] text-2xl">{folder.name}</h2>
    </div>
  );
};
