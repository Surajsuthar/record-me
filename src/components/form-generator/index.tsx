import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ErrorMessage } from "@hookform/error-message";

interface Props {
  type: "text" | "password" | "email" | "number";
  inputType: "select" | "input" | "textarea";
  options?: { value: string; label: string; id: string };
  label?: string;
  placeholder: string;
  register: UseFormRegister<any>;
  name: string;
  errors: FieldErrors<FieldValues>;
  lines?: number;
}

export const FormGenerator = ({
  type,
  inputType,
  options,
  label,
  placeholder,
  register,
  name,
  errors,
  lines,
}: Props) => {
  switch (inputType) {
    case "input":
      return (
        <Label
          className="flex flex-col gap-2 text-[#9d9d9d]"
          htmlFor={`input-${label}`}
        >
          {label && label}
          <Input
            id={`input-${label}`}
            type={type}
            placeholder={placeholder}
            className="bg-transparent border-themeGray text-themeTextGray"
            {...register(name)}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>;
            }}
          />
        </Label>
      );
      break;

    default:
      break;
  }
};
