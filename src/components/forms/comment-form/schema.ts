import { z } from "zod";

export const creatteCommentFrom = z.object({
  comment: z.string().min(1, { message: "Comment cannat apply" }),
});
