import { getUserProfile, getVideoComments } from "@/actions/user";
import { getPreviewVideo } from "@/actions/workspace";
import { VideoPreview } from "@/components/videos/video-preview";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface Props {
  params: {
    videoId: string;
  };
}

export default async function VideoPage({ params: { videoId } }: Props) {
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["preview-video"],
    queryFn: () => getPreviewVideo(videoId),
  });

  await query.prefetchQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });

  await query.prefetchQuery({
    queryKey: ['video-comment'],
    queryFn: () => getVideoComments(videoId)
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <VideoPreview videoId={videoId} />
    </HydrationBoundary>
  );
}
