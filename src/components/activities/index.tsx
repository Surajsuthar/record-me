import { useQueryData } from "@/hooks/useQueryData";
import { CommentForm } from "../forms/comment-form";
import { TabsContent } from "../ui/tabs";
import { getVideoComments } from "@/actions/user";
import { VideoCommentProps } from "@/types";
import { CommentCard } from "../comment-card";

interface Props {
  videoId: string;
  author: string;
}

export const Activities = ({ videoId, author }: Props) => {

  const { data } = useQueryData(['video-comment'],() => getVideoComments(videoId))

  const { data: comments } = data as VideoCommentProps

  return (
    <TabsContent
      value="Activity"
      className="p-5 bg-[#1d1d1d] rounded-xl flex flex-col gap-y-5"
    >
      <CommentForm videoId={videoId} author={author} />
      {comments.map((comment) => (
        <CommentCard 
        comment={comment.comment}
        key={comment.id}
        author={
          {
            image: comment.User?.image!,
            firstname: comment.User?.firstname!,
            lastname: comment.User?.lastname!
          }
        }
        videoId={videoId}
        reply={comment.reply}
        commentId={comment.id}
        />
      ))}
    </TabsContent>
  );
};
