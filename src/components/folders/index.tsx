"use client";
import { cn } from "@/lib/utils";
import FolderDuotone from "../icons/folder-duotone";
import { Folder } from "./folder";
import { useQueryData } from "@/hooks/useQueryData";
import { userMutationDataState } from "@/hooks/useMutationData";
import { getWorkSpaceFolder } from "@/actions/workspace";

interface Props {
  workspaceId: string;
}

export interface FolderProps {
  status: number;
  data: ({
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
    createdAt: Date;
    workSpaceId: string | null;
  })[];
}

export const Folders = ({ workspaceId }: Props) => {
  //get-folder
  const { data } = useQueryData(["workspace-folders"], () =>
    getWorkSpaceFolder(workspaceId),
  );
  //optimistic variable
  const { latesrVariabel } = userMutationDataState(["create-folder"]);

  const { status, data: folders } = data as FolderProps;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FolderDuotone />
          <h2 className="text-[#BDBDBD] text-xl">Folder</h2>
        </div>
        <div className="flex items-center gap-4">
          <FolderDuotone />
          <h2 className="text-[#BDBDBD] text-xl">See all</h2>
        </div>
      </div>
      <section
        className={cn(
          status == 200 && "justify-start",
          "flex items-center gap-4 overflow-x-auto w-full",
        )}
      >
        {status !== 200 ? (
          <p className="text-neutral-300">No folder in worksapce</p>
        ) : (
          <>
            {latesrVariabel && latesrVariabel.status == "pending" && (
              <Folder id="1" name="Folder" />
            )}
            {folders.map((folder) => (
              <Folder
                name={folder.name}
                count={folder._count.videos}
                id={folder.id}
                key={folder.id}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};
