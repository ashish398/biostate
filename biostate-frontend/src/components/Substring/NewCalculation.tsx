import React, { useState } from "react";
import { useMutation } from "react-query";
import SubstringForm from "./SubstringForm";
import { calculateLongestSubstring } from "../../api/post";
import Results from "./Results";
import Loader from "../Loader";

const NewCalculation = () => {
  const [result, setResult] = useState<{
    longestSubstringLength: number;
    uniqueSubstrings: string[];
  } | null>(null);

  const { mutate, isLoading, isError, error }: any = useMutation(
    (inputString: string) => calculateLongestSubstring(inputString),
    {
      onSuccess: (data) => {
        setResult(data);
      },
    }
  );

  const handleFormSubmit = (data: { inputString: string }) => {
    mutate(data.inputString);
  };

  return (
    <div>
      {" "}
      <h1 className="text-2xl font-bold mb-4">Longest Substring Calculator</h1>
      <SubstringForm
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
        errors={error}
      />
      {isLoading && <Loader />}
      {isError && <p className="text-red-500 mt-4">Error: {error?.message}</p>}
      <Results result={result} />
    </div>
  );
};

export default NewCalculation;
