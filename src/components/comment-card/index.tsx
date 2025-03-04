import { CommetReplyProps } from "@/types";
import { useState } from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { CommentForm } from "../forms/comment-form";

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
      <div>
        <p className="text-[#bdbdbd]">{comment}</p>
      </div>
      { !isReply ? (
        <Button
        onClick={() => setOnReply(true)}
        className="text-sm rounded-full bg-[#252525] text-white hover:text-black"
        >
          Reply
        </Button>
      ) : (
        <CommentForm
        close={() => setOnReply(false)}
        videoId={videoId}
        commetId={commentId}
        author={author.firstname+" "+author.lastname}
        >
        </CommentForm>
      )}
    </Card>
  );
};
