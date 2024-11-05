import React, { FC } from "react";
import Tree from "react-d3-tree";
import "./tree.css";

interface TreeVisualisationProps {
  treeData: any;
}

const TreeVisualisation: FC<TreeVisualisationProps> = ({ treeData }) => {
  if (!treeData) {
    return null;
  }

  console.log("tree data", treeData);

  // Custom node rendering based on the node's properties
  const renderCustomNode = ({ nodeDatum }: any) => (
    <g>
      <circle
        r={15}
        fill={nodeDatum.highlighted ? "#e63946" : "#666"}
        stroke={nodeDatum.highlighted ? "#e63946" : "#666"}
      />
      <text
        fill="#FFF"
        strokeWidth="0.5"
        x={20}
        y={5}
        fontSize="12"
        fontWeight={nodeDatum.highlighted ? "bold" : "normal"}
      >
        {nodeDatum.name}
      </text>
    </g>
  );

  return (
    <div
      aria-label="Tree Visualization"
      className="mt-8 h-[400px] border-2 border-gray-300 dark:border-gray-700 rounded overflow-hidden bg-white"
    >
      <Tree
        data={treeData}
        orientation="vertical"
        zoomable
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        renderCustomNodeElement={renderCustomNode}
      />
    </div>
  );
};

export default TreeVisualisation;
