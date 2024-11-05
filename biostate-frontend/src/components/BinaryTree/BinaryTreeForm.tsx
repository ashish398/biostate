import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../Button";

const treeSchema = z.object({
  binaryTreeInput: z
    .string()
    .min(1, { message: "Binary tree structure is required" })
    .refine(
      (val) => {
        try {
          const tree = JSON.parse(val);
          return Array.isArray(tree);
        } catch {
          return false;
        }
      },
      { message: "Invalid binary tree format. Must be a valid JSON array." }
    ),
});

type FormData = z.infer<typeof treeSchema>;

interface BinaryTreeFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  errorMessage?: string;
  defaultInput?: string;
}

const BinaryTreeForm: React.FC<BinaryTreeFormProps> = ({
  onSubmit,
  isLoading,
  errorMessage,
  defaultInput = "",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(treeSchema),
    defaultValues: {
      binaryTreeInput: defaultInput,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      aria-labelledby="binaryTreeFormTitle"
    >
      <h2 id="binaryTreeFormTitle" className="sr-only">
        Binary Tree Path Sum Calculator Form
      </h2>
      <div>
        <label htmlFor="binaryTreeInput" className="block mb-2 text-lg">
          Enter Binary Tree (in array format):
        </label>
        <textarea
          id="binaryTreeInput"
          {...register("binaryTreeInput")}
          placeholder="[10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]"
          aria-describedby="binaryTreeInputHelp binaryTreeInputError"
          aria-invalid={!!errors.binaryTreeInput}
          className={`border p-2 rounded w-full h-32 dark:bg-gray-700 dark:border-gray-600 ${
            errors.binaryTreeInput ? "border-red-500" : "border-gray-300"
          }`}
        />
        <p id="binaryTreeInputHelp" className="text-sm text-gray-500">
          Please enter the binary tree as a valid JSON array. Example: [10, 5,
          -3, 3, 2, null, 11, 3, -2, null, 1]
        </p>
        {errors.binaryTreeInput && (
          <p
            id="binaryTreeInputError"
            className="text-red-500 mt-2"
            role="alert"
          >
            {errors.binaryTreeInput.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        ariaLabel="Calculate Path Sums"
      >
        {isLoading ? "Calculating..." : "Calculate Path Sums"}
      </Button>

      {errorMessage && (
        <p className="text-red-500 mt-4" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
};

export default BinaryTreeForm;
