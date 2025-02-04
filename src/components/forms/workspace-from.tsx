import { useCreateWorkspace } from "@/hooks/useCreateWorkspace";

export const WorkspaceForm = () => {
  const { errors, onFormSubmit, register, isPending } = useCreateWorkspace();
  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3"></form>
  );
};
