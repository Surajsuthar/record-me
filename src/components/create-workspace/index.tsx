"use client";
import { getWorkspaces } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { Model } from "../model/model";
import { Button } from "../ui/button";
import FolderPlusDuotine from "../icons/folder-plus-duotone";
import { WorkspaceForm } from "../forms/workspace-from";

export const CreateWorkspace = () => {
  const { data } = useQueryData(["user-workspace"], getWorkspaces);
  console.log("data", data);
  // @ts-ignore
  const { data: plan } = data as {
    status: number;
    data: {
      subscription: {
        plan: "PRO" | "FREE";
      } | null;
    };
  };

  if (plan?.subscription?.plan === "FREE") {
    return <></>;
  }

  if (plan?.subscription?.plan === "PRO") {
    return (
      <Model
        title="Create Workspace"
        description="Workspaces helps you collaborate with team members. You are assigned a default personal workspace where you can share videos in private with yourself."
        trigger={
          <Button className="bg-[#d1d1d1] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl">
            <FolderPlusDuotine />
            Create a workspace
          </Button>
        }
      >
        <WorkspaceForm />
      </Model>
    );
  }

  return <div></div>;
};
