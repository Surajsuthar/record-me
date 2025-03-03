import { CommentForm } from "../forms/comment-form";
import { TabsContent } from "../ui/tabs";

interface Props {
  videoId: string;
  author: string;
}

export const Activities = ({ videoId, author }: Props) => {
  return (
    <TabsContent
      value="Activity"
      className="p-5 bg-[#1d1d1d] rounded-xl flex flex-col gap-y-5"
    >
      <CommentForm videoId={videoId} author={author} />
      <CommentCard />
    </TabsContent>
  );
};
