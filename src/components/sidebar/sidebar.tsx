"use client";
import Image from "next/image";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { useQueryData } from "@/hooks/useQueryData";
import { getWorkspaces } from "@/actions/workspace";
import { NotificationProp, WorkspaceProps } from "@/types";
import { Model } from "@/components/model/model";
import { Menu, PlusCircle } from "lucide-react";
import { Search } from "../search";
import { MENU_ITEMS } from "@/constants";
import { SidebarItem } from "./sidebar-item";
import { getNotifications } from "@/actions/user";
import { WorkSpacePlacehold } from "./workspace-placeholder";
import { GlobalCard } from "../global-card";
import { Button } from "@/components/ui/button";
import { Loader } from "../loader";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { InfoBar } from "../infobar";

interface Props {
  activeWorkSpaceId: string;
}

export const Sidebar = ({ activeWorkSpaceId }: Props) => {
  //upgrade
  const router = useRouter();
  const pathname = usePathname();

  const onChangeActiveWorkSpcae = (value: string) => {
    router.push(`/dashboard/${value}`);
  };
  const { data, isFetched } = useQueryData(["user-worksapces"], getWorkspaces);
  const { data: notification } = useQueryData(
    ["user-notification"],
    getNotifications,
  );

  const { data: workspace } = data as WorkspaceProps;
  const { data: count } = notification as NotificationProp;

  const menuItem = MENU_ITEMS(activeWorkSpaceId);
  const currentWorkspace = workspace.workspace.find(
    (s) => s.id === activeWorkSpaceId,
  );

  const sideBarOptions = (
    <div className="bg-[#111111] flex-none fixed p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-y-auto">
      <div className="bg-[#111111] p-4 gap-2 flex justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <Image src="/logo.svg" height={30} width={30} alt="logo" />
        <p className="text-xl text-white">Record me</p>
      </div>
      <Select
        defaultValue={activeWorkSpaceId}
        onValueChange={onChangeActiveWorkSpcae}
      >
        <SelectTrigger className="mt-16 text-white bg-transparent">
          <SelectValue placeholder="Select a workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#252525] backdrop-blur-xl">
          <SelectGroup className="gap-x-1">
            <SelectLabel>Workspace</SelectLabel>
            <Separator />
            {workspace.workspace.map((workspace) => (
              <SelectItem
                className="my-1"
                key={workspace.id}
                value={workspace.id}
              >
                {workspace.name}
              </SelectItem>
            ))}
            {workspace.members.length > 0 &&
              workspace.members.map(
                (workspace) =>
                  workspace.WorkSpace && (
                    <SelectItem
                      className="p-2"
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
      {currentWorkspace &&
        currentWorkspace?.type === "PUBLIC" &&
        workspace.subscription?.plan === "PRO" && (
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
        )}
      <p className="w-full text-[#9d9d9d] font-bold mt-4">Menu</p>
      <nav className="w-full">
        <ul>
          {menuItem.map((item) => (
            <SidebarItem
              href={item.href}
              icon={item.icon}
              title={item.title}
              selected={pathname === item.href}
              key={item.href}
              notification={
                (item.title == "Notification" &&
                  count._count &&
                  count._count.notification) ||
                0
              }
            />
          ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      <p className="w-full text-[#9d9d9d] font-bold mt-4"> Workspace </p>
      {workspace.workspace.length === 1 && workspace.members.length === 0 && (
        <div className="w-full mt-[-10px]">
          <p className="text-[#9d9d9d] font-medium text-sm">
            {workspace.subscription?.plan === "FREE"
              ? "Upgrade to create workspace"
              : "No workspace"}
          </p>
        </div>
      )}
      <nav className="w-full">
        <ul className="h-[140px] overflow-auto overflow-x-hidden fade-layer">
          {workspace.workspace.length > 0 &&
            workspace.workspace.map(
              (item) =>
                item.type !== "PERSONAL" && (
                  <SidebarItem
                    href={`/dashboard/${item.id}`}
                    selected={pathname === `/dashboard/${item.id}`}
                    title={item.name}
                    notification={0}
                    key={item.id}
                    icon={
                      <WorkSpacePlacehold>
                        {item.name.charAt(0)}
                      </WorkSpacePlacehold>
                    }
                  />
                ),
            )}
          {workspace.members.length > 0 &&
            workspace.members.map((item) => (
              <SidebarItem
                href={`/dashboard/${item.WorkSpace.id}`}
                selected={pathname === `/dashboard/${item.WorkSpace.id}`}
                title={item.WorkSpace.name}
                notification={0}
                key={item.WorkSpace.id}
                icon={
                  <WorkSpacePlacehold>
                    {item.WorkSpace.name.charAt(0)}
                  </WorkSpacePlacehold>
                }
              />
            ))}
        </ul>
      </nav>
      <Separator className="w-4/5 " />
      {workspace.subscription?.plan === "FREE" && (
        <GlobalCard
          title="Upgrade to pro"
          description="Unlock AI features like transcription, AI summary, and more."
          footer={
            <Button className="text-sm bg-[#9d9d9d] w-full">
              <Loader state={false}>Upgrade</Loader>
            </Button>
          }
        />
      )}
    </div>
  );

  return (
    <div className="full">
      {/* INFOBAR */}
      <InfoBar />
      {/* SHEETMOBILE AND DESKTOP */}
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button variant="ghost" className="mt-[12px]">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0 w-fit h-full">
            {sideBarOptions}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{sideBarOptions}</div>
    </div>
  );
};
