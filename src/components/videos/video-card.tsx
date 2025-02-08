import { Loader } from "../loader";
import { CardMenu } from "./card-menu";

interface Props {
  User: {
    firstname: string | null;
    lastname: string | null;
    image: string | null;
  } | null;
  id: string;
  Folder: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
  title: string;
  source: string;
  processing: boolean;
  workspaceId: string;
}

export const VideoCard = (props: Props) => {
  //WTP KEEP DATE LATER

  return (
    <Loader state={false}>
      <div className="overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl">
        <div className="absolute top-3 right-3 z-50 flex flex-col gap-y-3">
          <CardMenu
            currenWorkspace={props.workspaceId}
            currentFolder={props.Folder?.id}
            currentFolderName={props.Folder?.name}
            videoId={props.id}
          />
        </div>
      </div>
    </Loader>
  );
};
