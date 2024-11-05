import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import TreeBuilder from "../TreeBuilder/TreeBuilder";

const NewCalculation = () => {
  const treeInput = useSelector((state: RootState) => state.treeInput.input);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Binary Tree Path Sum Calculator
      </h1>
      <TreeBuilder defaultInput={treeInput} />
    </div>
  );
};

export default NewCalculation;
