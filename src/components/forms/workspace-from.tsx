import { useCreateWorkspace } from "@/hooks/useCreateWorkspace";
import { FormGenerator } from "../form-generator";
import { Button } from "../ui/button";
import { Loader } from "../loader";

export const WorkspaceForm = () => {
  const { errors, onFormSubmit, register, isPending } = useCreateWorkspace();
  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3">
      <FormGenerator
        label="Name"
        type="text"
        placeholder={"Workspace name"}
        errors={errors}
        inputType="input"
        register={register}
        name="name"
      />
      <Button
        className="text-sm w-full mt-2"
        type="submit"
        disabled={isPending}
      >
        <Loader state={isPending}>Create Workspace</Loader>
      </Button>
    </form>
  );
};
