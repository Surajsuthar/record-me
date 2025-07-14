"use client";
import { useCreateFolder } from "@/hooks/useCreateFolder";
import FolderPlusDuotine from "../icons/folder-plus-duotone";
import { Button } from "../ui/button";

interface Props {
  workspaceId: string;
}

export const CreateFolders = ({ workspaceId }: Props) => {
  const { onCreateNewFolder } = useCreateFolder(workspaceId);

  return (
    <Button
      className="flex items-center gap-2 py-6 px-2 rounded-lg"
      onClick={onCreateNewFolder}
    >
      <FolderPlusDuotine />
      Create Folder
    </Button>
  );
};
