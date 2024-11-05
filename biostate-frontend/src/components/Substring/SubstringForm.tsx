import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button";

// Assuming Basic Punctuation = [".", ",", "?", "!"]
const stringSchema = z.object({
  inputString: z
    .string()
    .trim()
    .min(1, { message: "String is required" })
    .max(100, { message: "String must be less than 100 characters" })
    .regex(/^[a-zA-Z0-9.,!?]*$/, {
      message:
        "Only alphanumeric characters and basic punctuation (.,!?) are allowed",
    }),
});

type FormData = z.infer<typeof stringSchema>;

interface SubstringFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  errors?: any;
}

const SubstringForm: React.FC<SubstringFormProps> = ({
  onSubmit,
  isLoading,
  errors,
}) => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(stringSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      aria-label="Substring Form"
    >
      <div>
        <label htmlFor="inputString" className="block mb-2 text-lg">
          Enter a string:
        </label>
        <input
          id="inputString"
          type="text"
          {...register("inputString")}
          aria-invalid={!!formState.errors.inputString}
          aria-describedby="inputStringHelp inputStringError"
          className={`border p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 ${
            formState.errors.inputString ? "border-red-500" : "border-gray-300"
          }`}
        />
        <p id="inputStringHelp" className="text-sm text-gray-500">
          Only alphanumeric characters and basic punctuation (.,!?)
        </p>
        {formState.errors.inputString && (
          <p id="inputStringError" className="text-red-500 mt-2" role="alert">
            {formState.errors.inputString.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isLoading} ariaLabel="Calculate">
        {isLoading ? "Calculating..." : "Calculate"}
      </Button>
    </form>
  );
};

export default SubstringForm;
