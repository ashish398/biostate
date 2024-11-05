import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchUserSubstringHistory } from "../../api/get";
import Loader from "../Loader";
import Results from "./Results";

const UserHistory: React.FC = () => {
  const { data, error, isLoading } = useQuery(
    "userHistory",
    fetchUserSubstringHistory
  );
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error fetching history: {(error as any).message}
      </div>
    );
  }

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div
      className="p-4 bg-white dark:bg-gray-900 text-black dark:text-white h-screen flex flex-col overflow-y-scroll max-h-[85%]"
      role="region"
      aria-label="User Calculation History"
    >
      <h1 className="text-2xl font-bold mb-1">User Calculation History</h1>
      <p className="italic text-xs text-gray-200 mb-4">
        (Click tile to expand)
      </p>
      {data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map((entry: any, index: number) => (
            <div
              key={entry.id || index}
              className="bg-gray-100 dark:bg-gray-800 rounded shadow-sm"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left p-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-expanded={expandedIndex === index}
                aria-controls={`result-panel-${index}`}
              >
                <div className="flex flex-col max-w-[90%]">
                  <h4 className="text-lg line-clamp-2 text-ellipsis">
                    <span className="font-semibold">Input:</span> {entry.input}
                  </h4>
                  <p className="text-xs italic mt-1">
                    Created at: {new Date(entry.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className="text-xl" aria-hidden="true">
                  {expandedIndex === index ? "-" : "+"}
                </span>
              </button>
              {expandedIndex === index && (
                <div
                  id={`result-panel-${index}`}
                  className="border-t border-gray-300 dark:border-gray-700"
                  role="region"
                  aria-labelledby={`result-panel-${index}`}
                >
                  <Results result={entry} />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No previous calculations found.</p>
      )}
    </div>
  );
};

export default UserHistory;
