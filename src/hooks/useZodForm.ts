import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z, { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const useZodFrom = (
  schema: ZodSchema,
  mutation: UseMutateFunction,
  defaultvalue?: any,
) => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultvalue },
  });

  const onFormSubmit = handleSubmit(async (value) => mutation({ ...value }));
  return {
    register,
    watch,
    reset,
    onFormSubmit,
    errors,
  };
};
