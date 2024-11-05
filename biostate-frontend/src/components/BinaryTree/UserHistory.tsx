import React from "react";
import { useQuery } from "react-query";
import { fetchUserTreeHistory } from "../../api/get";
import Loader from "../Loader";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { setTreeInput } from "../../redux/slices/treeInputSlice";
import { parseTree } from "../../utils/treeBuilder";

interface UserHistoryProps {
  setTab: (tab: "new" | "history") => void;
}

const UserHistory: React.FC<UserHistoryProps> = ({ setTab }) => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useQuery(
    "userTreeHistory",
    fetchUserTreeHistory
  );

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

  const onLoadHandler = (input: any) => {
    const parsingTree = JSON.parse(input);
    const parsedTree = parseTree(parsingTree);
    dispatch(setTreeInput(parsedTree));
    setTab("new");
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-black dark:text-white h-screen flex flex-col overflow-y-scroll max-h-[85%]">
      <h1 className="text-2xl font-bold mb-1">User History</h1>
      {data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map((entry: any, index: number) => {
            return (
              <div
                key={entry.id || index}
                className="bg-gray-100 dark:bg-gray-800 rounded shadow-sm flex flex-col p-2"
              >
                <h4 className="text-lg">
                  <span className="font-semibold">Input:</span>
                  <div className="whitespace-pre-wrap break-words">
                    {entry.input}
                  </div>
                </h4>
                <p className="text-xs italic mt-1">
                  created at: {new Date(entry.createdAt).toLocaleString()}{" "}
                </p>
                <div>
                  <Button
                    onClick={() => onLoadHandler(entry.input)}
                    ariaLabel="Load"
                  >
                    Load
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No previous calculations found.</p>
      )}
    </div>
  );
};

export default UserHistory;
