import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface CustomNodeRendererProps {
  nodeDatum: any;
  selectedNode: any;
  highlightedNodes: string[];
  handleNodeClick: (nodeDatum: any) => void;
}

const CustomNodeRenderer: React.FC<CustomNodeRendererProps> = ({
  nodeDatum,
  selectedNode,
  highlightedNodes,
  handleNodeClick,
}) => {
  const isHighlighted = highlightedNodes.includes(nodeDatum.attributes.id);
  const isSelected = selectedNode?.attributes?.id === nodeDatum.attributes.id;
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <g>
      <circle
        r={15}
        fill={isHighlighted ? "#ff0" : "#fff"}
        stroke={isSelected ? "#FF0000" : "#000"}
        strokeWidth={isSelected ? 2 : 1}
        onClick={() => handleNodeClick(nodeDatum)}
      />
      <text
        fill={theme === "dark" ? "white" : "black"}
        strokeWidth="1"
        stroke={theme === "dark" ? "white" : "black"}
        x="20"
        onClick={() => handleNodeClick(nodeDatum)}
      >
        {nodeDatum.name}
      </text>
    </g>
  );
};

export default CustomNodeRenderer;
