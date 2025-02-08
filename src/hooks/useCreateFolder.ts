import { CreateFolders } from "@/actions/workspace";
import { useMutationData } from "./useMutationData";

export const useCreateFolder = (workspaceId: string) => {
  const { mutate, isPending } = useMutationData(
    ["create-folder"],
    (data: { name: string }) => CreateFolders(workspaceId),
    "worksapce-folder",
  );

  const onCreateNewFolder = () => {
    mutate({ name: "Untitled", id: "optimistic--id" });
  };

  return { onCreateNewFolder };
};
