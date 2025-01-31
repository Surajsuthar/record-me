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
import { userQueryData } from "@/hooks/userQueryData";
import { getWorkspaces } from "@/actions/workspace";
import { WorkspaceProps } from "@/types";

interface Props {
  activeWorkSpaceId: string;
}

export const Sidebar = ({ activeWorkSpaceId }: Props) => {
  const router = useRouter();
  const onChangeActiveWorkSpcae = (value: string) => {
    router.push(`/dashboard/${value}`);
  };
  const { data, isFetched } = userQueryData(["user-worksapces"], getWorkspaces);

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
    </div>
  );
};
