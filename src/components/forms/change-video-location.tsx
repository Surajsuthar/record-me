import { useMoveVideos } from "@/hooks/useFolder";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Loader } from "../loader";

interface Props {
  videoId: string;
  currentFolder?: string;
  currentFolderName?: string;
  currenWorkspace?: string;
}

export const ChangeVideoLocation = ({
  videoId,
  currentFolder,
  currentFolderName,
  currenWorkspace,
}: Props) => {
  const {
    onFormSubmit,
    errors,
    register,
    isPending,
    folders,
    workspaces,
    isFetching,
    isFolder,
  } = useMoveVideos(videoId, currenWorkspace);

  const folder = folders.find((Item) => Item.id === currentFolder);
  const workspace = workspaces.find((Item) => Item.id === currenWorkspace);

  return (
    <form className="flex flex-col gap-y-5" onSubmit={onFormSubmit}>
      <div className="border-[1px] rounded-xl p-5">
        <h2 className="text-xs mb-5 text-[#a4a4a4]">Current Workspace</h2>
        {workspace && <p className="">{workspace.name}</p>}
        <h2 className="text-[#a4a4a4]">Current Folder</h2>
        {folder ? <p>{folder.name}</p> : "This video has no folder"}
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col gap-y-5 border-[1px] rounded-xl">
        <h2 className="text-sm text-[#a4a4a4]">To</h2>
        <Label className="flex-col gap-y-2 flex">
          <p className="text-sm">Workspace</p>
          <select
            className=" rounded-xl text-base bg-transparent"
            {...register("workspace_id")}
          >
            {workspaces &&
              workspaces.map((space) => (
                <option key={space.id} value={space.id} className="">
                  {space.name}
                </option>
              ))}
          </select>
        </Label>
        {isFetching ? (
          <Skeleton className="w-full h-[40px] rounded-xl" />
        ) : (
          <Label>
            {isFolder && isFolder.length > 0 ? (
              <select
                className=" rounded-xl bg-transparent text-base"
                {...register("folder_id")}
              >
                {isFolder.map((folder, key) => (
                  <option key={key} value={folder.id} className="">
                    {folder.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-[#a4a4a4] text-sm">
                This workspace has no folder
              </p>
            )}
          </Label>
        )}
      </div>
      <Button>
        <Loader state={isPending} color="#000">
          Transfer
        </Loader>
      </Button>
    </form>
  );
};
