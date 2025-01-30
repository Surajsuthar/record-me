import { onAuthenticateUse } from "@/actions/user";
import { verifyAccessToWorkspace } from "@/actions/workspace";
import { redirect } from "next/navigation";
import React from "react";

interface props {
  params: { workspaceId: string };
  children: React.ReactNode;
}

export default async function Layout({
  params: { workspaceId },
  children,
}: props) {
  const auth = await onAuthenticateUse();
  if (!auth.user?.workspace && !auth.user?.workspace)
    return redirect("/auth/sign-in");
  const hashAccess = await verifyAccessToWorkspace(workspaceId);

  if (hashAccess.status !== 200) {
    redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }
  if (!hashAccess.data?.workspace) {
    return null;
  }
  return <div></div>;
}
