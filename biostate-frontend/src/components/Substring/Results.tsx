import React, { FC } from "react";
import Button from "../Button";
import { useMutation } from "react-query";
import { saveSubstringResult } from "../../api/post";
import { showToast } from "../../utils/toast";
import { Copy } from "lucide-react";

interface ResultsProps {
  result: any;
  isHistory?: boolean;
}

const Results: FC<ResultsProps> = ({ result, isHistory = false }) => {
  const mutation = useMutation({
    mutationFn: () => saveSubstringResult(result),
    onSuccess: () => {
      showToast("success", "Successfully saved the result");
    },
    onError: (error: any) => {
      showToast("error", "Something went wrong while saving");
    },
  });

  if (!result) {
    return null;
  }

  const onSaveHandler = () => {
    mutation.mutate();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("success", "Copied to clipboard");
  };
  return (
    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded flex flex-col overflow-y-scroll max-h-[70%]">
      <div className="flex flex-row gap-2 items-center justify-between md:justify-start md:gap-10">
        <h2 className="text-xl font-semibold">Result:</h2>

        {!isHistory && (
          <Button variant="success" onClick={onSaveHandler} ariaLabel="Save">
            Save
          </Button>
        )}
      </div>
      <p>Longest substring length: {result.longestSubstringLength}</p>
      <h3 className="text-lg font-semibold mt-2">Unique Substrings:</h3>{" "}
      <span className="text-xs">
        (only showing substrings lesser than 10 char)
      </span>
      <p className="text-xs italic my-1">
        *green indicates the longest substring
      </p>
      <ul className="list-disc list-inside">
        {result.uniqueSubstrings
          .filter((substring: string) => substring.length <= 10)
          .map((substring: string, index: any) => (
            <li
              key={index}
              className={`flex items-center flex-row ${
                substring.length === result.longestSubstringLength
                  ? "font-bold text-green-500"
                  : ""
              }`}
            >
              <span className="mr-2">{substring}</span>
              <button
                onClick={() => copyToClipboard(substring)}
                className="ml-0 text-gray-500 hover:text-gray-700 mt-1"
                aria-label="Copy substring"
              >
                <Copy size={10} />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Results;
