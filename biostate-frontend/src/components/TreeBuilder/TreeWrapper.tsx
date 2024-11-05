import React from "react";
import Tree from "react-d3-tree";
import CustomNodeRenderer from "./CustomNodeRender";

interface TreeWrapperProps {
  d3TreeData: any;
  selectedNode: any;
  highlightedNodes: string[];
  handleNodeClick: (nodeDatum: any) => void;
}

const TreeWrapper: React.FC<TreeWrapperProps> = ({
  d3TreeData,
  selectedNode,
  highlightedNodes,
  handleNodeClick,
}) => {
  console.log("highlighted nodes", highlightedNodes);
  return (
    <div style={{ width: "100%", height: "500px" }} id="treeWrapper">
      <Tree
        data={d3TreeData}
        orientation="vertical"
        translate={{ x: 400, y: 50 }}
        zoomable={true}
        collapsible={false}
        transitionDuration={500}
        renderCustomNodeElement={(rd3tProps) => (
          <CustomNodeRenderer
            {...rd3tProps}
            selectedNode={selectedNode}
            highlightedNodes={highlightedNodes}
            handleNodeClick={handleNodeClick}
          />
        )}
      />
    </div>
  );
};

export default TreeWrapper;
