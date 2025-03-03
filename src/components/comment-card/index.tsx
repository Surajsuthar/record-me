import { CommetReplyProps } from "@/types";
import { useState } from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "../ui/avatar";

interface Props {
  comment: string;
  author: { image: string; firstname: string; lastname: string };
  videoId: string;
  commentId?: string;
  reply: CommetReplyProps[];
  isReply?: boolean;
}

export const CommentCard = ({
  comment,
  author,
  videoId,
  commentId,
  reply,
  isReply,
}: Props) => {
  const [onReply, setOnReply] = useState<boolean>(false);
  return (
    <Card
      className={cn(
        isReply
          ? "bg-[#1d1d1d] pl-10 border-none"
          : "border-[1px] bg-[#1d1d1d] p-5",
      )}
    >
      <div className="flex gap-x-2 items-center">
        <Avatar>
          <AvatarImage src={author.image} alt="author"></AvatarImage>
        </Avatar>
        <p className=" capitalize text-sm text-[#bdbdbd]">
          {author.firstname} {author.lastname}
        </p>
      </div>
    </Card>
  );
};
