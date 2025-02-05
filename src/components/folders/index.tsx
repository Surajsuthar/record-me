import { cn } from "@/lib/utils";
import FolderDuotone from "../icons/folder-duotone";
import { Folder } from "./folder";

interface Props {
  workspaceId: string;
}

export const Folders = ({ workspaceId }: Props) => {
  //get-folder
  //optimistic variable
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
      <section className={cn("flex items-center gap-4 overflow-x-auto w-full")}>
        <Folder id="1" name="Folder" />
      </section>
    </div>
  );
};
