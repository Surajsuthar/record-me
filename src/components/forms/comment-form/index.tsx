import { FormGenerator } from "@/components/form-generator";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useVideoComment } from "@/hooks/useVideo";
import { Send } from "lucide-react";

interface Props {
  author: string;
  videoId: string;
  commetId?: string;
  close?: () => void;
}

export const CommentForm = ({ author, videoId, commentId }: Props) => {
  const { register, errors, isPending, onFormSubmit } = useVideoComment(
    videoId,
    commentId,
  );

  return (
    <form className=" relative w-full" onSubmit={onFormSubmit}>
      <FormGenerator
        register={register}
        errors={errors}
        placeholder={`respond to ${author}`}
        name="comment"
        inputType="input"
        lines={8}
        type="text"
      />
      <Button
        className="p-0 bg-transparent absolute top-[1px] right-3 hover:bg-transparent"
        type="submit"
      >
        <Loader state={isPending}>
          <Send
            className="text-white/80 cursor-pointer hover:text-white/80"
            size={18}
          />
        </Loader>
      </Button>
    </form>
  );
};
