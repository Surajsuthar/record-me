import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useMutationData } from "./useMutationData";
import { getWorkSpaceFolder, moveVideoLocation } from "@/actions/workspace";
import { useZodFrom } from "./useZodForm";
import { moveVideoSchema } from "@/components/forms/type";

export const useMoveVideos = (videoId: string, currentWorkspace: string) => {
  const { folders } = useAppSelector((state) => state.FolderReducer);
  const { workspaces } = useAppSelector((state) => state.WorkspaceReducer);

  //fetching state
  const [isFetching, setIsFetching] = useState(false);
  const [isFolder, setIsFolder] = useState<
    | ({
        _count: number;
      } & {
        id: string;
        name: string;
        createdAt: Date;
        workSpaceId: string | null;
      })[]
    | undefined
  >(undefined);

  const { mutate, isPending } = useMutationData(
    ["change-video-location"],
    (data: { folder_id: string; workspace_id: string }) => {
      moveVideoLocation(videoId, data.folder_id, data.workspace_id);
    },
  );

  const { errors, onFormSubmit, watch, register } = useZodFrom(
    moveVideoSchema,
    mutate,
    { folder_id: null, workspace_id: currentWorkspace },
  );

  //fetching with a use effect
  const fetchFolder = async (workspace: string) => {
    setIsFetching(true);
    const folder = await getWorkSpaceFolder(workspace);
    setIsFetching(false);
    setIsFolder(folder.data);
  };

  useEffect(() => {
    fetchFolder(currentWorkspace);
  }, []);

  useEffect(() => {
    const workspace = watch(async (value) => {
      if (value.workspace_id) fetchFolder(value.workspace_id);
    });

    return () => workspace.unsubscribe();
  }, [watch]);

  return {
    onFormSubmit,
    errors,
    register,
    isPending,
    folders,
    workspaces,
    isFetching,
    isFolder,
  };
};
