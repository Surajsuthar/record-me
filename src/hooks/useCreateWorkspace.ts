import { CreateWorkspace } from "@/actions/user";
import { useMutationData } from "./useMutationData";
import { useZodFrom } from "./useZodForm";
import { workspaceSchema } from "@/components/create-workspace/schema";

export const useCreateWorkspace = () => {
  const { mutate, isPending } = useMutationData(
    ["create-workspace"],
    (data: { name: string }) => CreateWorkspace(data.name),
    "user-workspace",
  );

  const { errors, onFormSubmit, register } = useZodFrom(
    workspaceSchema,
    mutate,
  );

  return { errors, onFormSubmit, register, isPending };
};
