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

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <VideoPreview videoId={videoId} />
    </HydrationBoundary>
  );
}
