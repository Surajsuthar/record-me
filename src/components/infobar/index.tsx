import { Search, UploadIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import VideoRecorderIcon from "../icons/video-recorder";
import { UserButton } from "@clerk/nextjs";

export const InfoBar = () => {
  return (
    <header className="pl-20 md:pl-[260px] p-4 fixed w-full flex items-center justify-between gap-4">
      <div className="flex gap-4 justify-center items-center rounded-full border-2 px-4 w-full max-w-lg">
        <Search size={25} className="text-neutral-500" />
        <Input
          className="!border-none !outline-none !ring-0 !shadow-none px-0 py-1 text-base placeholder-neutral-500 w-full bg-transparent"
          placeholder="Search for people , project, tags and folders"
        />
      </div>
      <div className="flex items-center gap-4">
        <Button className="flex items-center gap-2">
          <UploadIcon size={20} />{" "}
          <span className="flex items-center gap-2 ">Upload</span>
        </Button>
        <Button className="bg-[#9d9d9d] flex items-center gap-2">
          <VideoRecorderIcon />
          <span className="flex items-center gap-2 ">Upload</span>
        </Button>
        <UserButton />
      </div>
    </header>
  );
};
