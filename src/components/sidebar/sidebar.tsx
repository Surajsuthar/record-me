"use client";
import Image from "next/image";
import { Select, SelectItem } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import {
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Separator } from "../ui/separator";
import { useQueryData } from "@/hooks/userQueryData";
import { getWorkspaces } from "@/actions/workspace";
import { WorkspaceProps } from "@/types";
import { Model } from "@/components/model/model";
import { PlusCircle } from "lucide-react";
import { Search } from "../search";

interface Props {
  activeWorkSpaceId: string;
}

export const Sidebar = ({ activeWorkSpaceId }: Props) => {
  const router = useRouter();
  const onChangeActiveWorkSpcae = (value: string) => {
    router.push(`/dashboard/${value}`);
  };
  const { data, isFetched } = useQueryData(["user-worksapces"], getWorkspaces);

  const { data: workspace } = data as WorkspaceProps;
  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <Image src="/logo.svg" height={40} width={40} alt="logo" />
        <p className="text-2xl">Record me</p>
      </div>
      <Select
        defaultValue={activeWorkSpaceId}
        onValueChange={onChangeActiveWorkSpcae}
      >
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspace</SelectLabel>
            <Separator />
            {workspace.workspace.map((workspace) => (
              <SelectItem key={workspace.id} value={workspace.id}>
                {workspace.name}
              </SelectItem>
            ))}
            {workspace.members.length > 0 &&
              workspace.members.map(
                (workspace) =>
                  workspace.WorkSpace && (
                    <SelectItem
                      value={workspace.WorkSpace.id}
                      key={workspace.WorkSpace.id}
                    >
                      {workspace.WorkSpace.name}
                    </SelectItem>
                  ),
              )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Model
        title="Invite to workspace"
        trigger={
          <span
            className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60
            w-full rounded-sm p-[5px] gap-2"
          >
            <PlusCircle className="text-neutral-800/90 fill-neutral-500" />
            <span className="text-neutral-400 font-semibold text-sm">
              Invite to workspace
            </span>
          </span>
        }
        description="Invite other user to workspace"
      >
        <Search workspaceId={activeWorkSpaceId} />
      </Model>
    </div>
  );
};
