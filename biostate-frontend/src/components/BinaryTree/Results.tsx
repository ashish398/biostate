import React, { FC } from "react";
import Button from "../Button";
import { useMutation } from "react-query";
import { saveTreeResult } from "../../api/post";
import { showToast } from "../../utils/toast";

interface ResultsProps {
  result: any;
}

const Results: FC<ResultsProps> = ({ result }) => {
  const mutation = useMutation({
    mutationFn: () => saveTreeResult(result),
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
  return (
    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
      <div className="flex flex-row gap-2 items-center justify-between md:justify-start md:gap-10">
        <h2 className="text-xl font-semibold">Result:</h2>

        <Button variant="success" onClick={onSaveHandler} ariaLabel="Save">
          Save
        </Button>
      </div>

      <p>Max path sum from leaf to any node: {result.maxLeafToNodeSum}</p>
      <p>Max path sum between any two nodes: {result.maxAnyNodeSum}</p>
    </div>
  );
};

export default Results;
