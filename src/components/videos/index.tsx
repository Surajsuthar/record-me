"use client";
import { getAllUserVideos } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { VideosProps } from "@/types";
import VideoRecorderDuotone from "../icons/video-recorder-duotone";
import { cn } from "@/lib/utils";
import { VideoCard } from "./video-card";

interface Props {
  folderId: string;
  videoKey: string;
  workspaceId: string;
}

const video = {
  User: {
    firstname: "Alice",
    lastname: "Johnson",
    image: "https://example.com/profile.jpg",
  },
  id: "vid_123",
  processing: false,
  Folder: {
    id: "folder_456",
    name: "Programming",
  },
  createdAt: new Date("2024-02-08T14:00:00Z"),
  title: "Understanding TypeScript Generics",
  source: "https://example.com/video.mp4",
};

export const Videos = ({ folderId, videoKey, workspaceId }: Props) => {
  const { data: videoData } = useQueryData([videoKey], () =>
    getAllUserVideos(folderId),
  );

  const { status: videoStatus, data: videos } = videoData as VideosProps;
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <VideoRecorderDuotone />
          <h2 className="text-[#bdbdbd] text-xl">Videos</h2>
        </div>
      </div>
      <section
        className={cn(
          videoStatus !== 200
            ? "p-5"
            : "grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
        )}
      >
        {/* {videoStatus===200 ? (
                videos.map((video) => ( <VideoCard/>))
            ) : <p className="text-[#bdbdbd]">
                No video in workspace
                </p>} */}
        <VideoCard workspaceId={workspaceId} {...video} />
      </section>
    </div>
  );
};
