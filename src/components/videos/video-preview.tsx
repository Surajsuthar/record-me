"use client";
import { getPreviewVideo } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { VideoProps } from "@/types";
import { useRouter } from "next/navigation";

interface Props {
  videoId: string;
}

export const VideoPreview = ({ videoId }: Props) => {
  const router = useRouter();
  //wip : notify on first view
  const { data } = useQueryData(["preview-video"], () =>
    getPreviewVideo(videoId),
  );

  const { data: video, status, author } = data as VideoProps;
  if (status !== 200) router.push("/");

  const daysAgo = Math.floor(
    (new Date().getTime() - video.createdAt.getTime()) / (24 * 60 * 60 * 1000),
  );
  return <div></div>;
};
