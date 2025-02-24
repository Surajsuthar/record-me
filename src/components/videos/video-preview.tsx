"use client";
import { getPreviewVideo } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { VideoProps } from "@/types";
import { useRouter } from "next/navigation";
import { CopyLink } from "./copy-link";
import { RichLink } from "./rich-link";
import { truncateString } from "@/lib/utils";
import { Download } from "lucide-react";
import { TabMenu } from "../tabs";
import { AiTools } from "../ai-tools";
import { VideoTranscript } from "../video-transcript";
import { TabsContent } from "../ui/tabs";
import { Activities } from "../activities";

interface Props {
  videoId: string;
}

export const VideoPreview = ({ videoId }: Props) => {
  const router = useRouter();
  //wip : notify on first view
  //wip : setup activity
  const { data } = useQueryData(["preview-video"], () =>
    getPreviewVideo(videoId),
  );

  const { data: video, status, author } = data as VideoProps;
  if (status !== 200) router.push("/");

  const daysAgo = Math.floor(
    (new Date().getTime() - video.createdAt.getTime()) / (24 * 60 * 60 * 1000),
  );
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 p-10 lg:px-20 lg:py-10 overflow-y-auto gap-5">
      <div className="flex flex-col lg:col-span-2 gap-y-10">
        <div className="">
          <div className="flex items-start justify-between gap-x-5">
            <h2 className="text-white text-4xl font-bold">{video.title}</h2>
            {/* { author ? (
              <EditVideo
              videoId={videoId}
              title={video.title as string}
              description={video.description as string}
              />
            ) : (<></>) } */}
          </div>
          <span className="flex gap-x-2">
            <p className="text-[#9d9d9d] capitalize">
              {video.User?.firstname} {video.User?.lastname}
            </p>
            <p className="text-[#707070]">
              {daysAgo === 0 ? "Today" : `${daysAgo}s ago`}
            </p>
          </span>
        </div>
        <video
          className="w-full aspect-video opacity-50 rounded-xl"
          preload="metadata"
          controls
        >
          <source
            src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${video.source}/#1`}
          ></source>
        </video>
        <div className="flex flex-col text-2xl gap-y-4">
          <div className="flex gap-x-5 items-center justify-between">
            <p className="text-[#bdbdbd] font-semibold">Description</p>
            {/* { author ? (
              <EditVideo
              videoId={videoId}
              title={video.title as string}
              description={video.description as string}
              />
            ) : (<></>) } */}
          </div>
          <p className="text-[#9d9d9d] text-lg font-medium">
            {video.description}
          </p>
        </div>
      </div>
      <div className="lg:col-span-1 flex flex-col gap-y-16">
        <div className="flex justify-end gap-x-3">
          <CopyLink
            variant={"outline"}
            className="rounded-full bg-transparent px-10"
            videoId={videoId}
          />
          <RichLink
            description={truncateString(video.description as string, 150)}
            id={videoId}
            source={video.source}
            title={video.title as string}
          />
          <Download />
        </div>
        <div>
          <TabMenu
            defaultvalue="Ai Tools"
            triggers={["Ai Tools", "Transcript", "Activity"]}
          >
            <AiTools
              plan={video.User?.subscription?.plan!}
              videoId={videoId}
              trail={video.User?.trial!}
            />
            <VideoTranscript transcript={video.description} />
            <Activities
              author={video.User?.firstname as string}
              videoId={videoId}
            />
          </TabMenu>
        </div>
      </div>
    </div>
  );
};
