import { Move } from "lucide-react";
import { Model } from "../model/model";
import { ChangeVideoLocation } from "../forms/change-video-location";

interface Props {
  videoId: string;
  currentFolder?: string;
  currentFolderName?: string;
  currenWorkspace?: string;
}

export const CardMenu = ({
  videoId,
  currentFolder,
  currentFolderName,
  currenWorkspace,
}: Props) => {
  return (
    <Model
      className="flex items-center cursor-pointer gap-x-2"
      title="Move to new Folder/workspace"
      description="This action can't be undone. this will permennetly delete your account and remove from our servers"
      trigger={<Move size={20} fill="#a4a4a4" className="text-[#a4a4a4]" />}
    >
      <ChangeVideoLocation
        videoId={videoId}
        currentFolder={currentFolder}
        currentFolderName={currentFolderName}
        currenWorkspace={currenWorkspace}
      />
    </Model>
  );
};
