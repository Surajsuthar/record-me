import Link from "next/link";
import { Loader } from "../loader";
import { CardMenu } from "./card-menu";
import { CopyLink } from "./copy-link";

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

  const daysAgo = Math.floor(
    (new Date().getTime() - props.createdAt.getTime()) / (24 * 60 * 60 * 1000),
  );

  return (
    <Loader
      className="bg-[#171717] flex justify-center items-center border-[1px] border-[#252525] rounded-xl"
      state={props.processing}
    >
      <div className="overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl">
        <div className="absolute top-3 right-3 z-50 flex flex-col gap-y-3">
          <CardMenu
            currenWorkspace={props.workspaceId}
            currentFolder={props.Folder?.id}
            currentFolderName={props.Folder?.name}
            videoId={props.id}
          />
          <CopyLink
            className="p-0 h-5 bg-hover:bg-transparent"
            videoId={props.id}
            variant={"outline"}
          />
        </div>
        <Link
          href={`/preview/${props.id}`}
          className="hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full"
        >
          <video
            controls={false}
            preload="metadata"
            className="w-full aspect-video opacity-50 z-50"
          >
            <source
              src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${props.source}#t=1`}
            ></source>
          </video>
        </Link>
      </div>
    </Loader>
  );
};
