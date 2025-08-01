import { getNotifications, onAuthenticateUse } from "@/actions/user";
import {
  getAllUserVideos,
  getWorkSpaceFolder,
  getWorkspaces,
  verifyAccessToWorkspace,
} from "@/actions/workspace";
import { GlobleHeader } from "@/components/global-header";
import { Sidebar } from "@/components/sidebar/sidebar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React from "react";

interface props {
  params: { workspaceId: string };
  children: React.ReactNode;
}

export default async function Layout({ params, children }: props) {
  const { workspaceId } = await params;
  const auth = await onAuthenticateUse();
  
  if (!auth.user?.workspace) return redirect("/auth/sign-in");
  if (!auth.user.workspace.length) redirect("/auth/sign-in");

  const hashAccess = await verifyAccessToWorkspace(workspaceId);

  if (hashAccess.status !== 200) {
    redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }
  if (!hashAccess.data?.workspace) {
    return null;
  }

  const Query = new QueryClient();

  await Query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkSpaceFolder(workspaceId),
  });

  await Query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  });

  await Query.prefetchQuery({
    queryKey: ["user-worksapces"],
    queryFn: () => getWorkspaces(),
  });

  await Query.prefetchQuery({
    queryKey: ["user-notification"],
    queryFn: () => getNotifications(),
  });
  return (
    <HydrationBoundary state={dehydrate(Query)}>
      <div className="flex h-screen w-screen">
        <Sidebar activeWorkSpaceId={workspaceId} />
        <div className="w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden">
          <GlobleHeader workspace={hashAccess.data.workspace} />
          <div className="mt-4 ml-[260]">{children}</div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
