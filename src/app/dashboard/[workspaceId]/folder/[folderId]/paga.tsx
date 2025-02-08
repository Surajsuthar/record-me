import { getAllUserVideos, getFolderInfo } from "@/actions/workspace";
import { FolderInfo } from "@/components/folders/folder-info";
import { Videos } from "@/components/videos";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface Props {
  params: {
    folderId: string;
    workspaceId: string;
  };
}

export default async function ({ params: { folderId, workspaceId } }: Props) {
  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: ["folder-videos"],
    queryFn: () => getAllUserVideos(folderId),
  });

  await query.prefetchQuery({
    queryKey: ["folder-info"],
    queryFn: () => getFolderInfo(folderId),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <FolderInfo folderId={folderId} />
      <Videos
        workspaceId={workspaceId}
        folderId={folderId}
        videoKey="folder-videos"
      />
    </HydrationBoundary>
  );
}
