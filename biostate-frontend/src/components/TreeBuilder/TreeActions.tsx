import React from "react";
import Button from "../Button";

interface TreeActionsProps {
  addChildNode: (isLeft: boolean) => void;
  editNodeValue: () => void;
  deleteNode: () => void;
  handleMaxLeafToAnyPath: () => void;
  handleMaxAnyToAnyPath: () => void;
  saveTree: () => void;
}

const TreeActions: React.FC<TreeActionsProps> = ({
  addChildNode,
  editNodeValue,
  deleteNode,
  handleMaxLeafToAnyPath,
  handleMaxAnyToAnyPath,
  saveTree,
}) => {
  return (
    <div className="mt-4 flex flex-col">
      <p className="text-xs font-semibold italic">
        press "a" to add left node, "d" to add right node on the selected node,
        and "e" to edit selected node
      </p>

      <div className="flex space-x-2">
        <Button
          onClick={() => addChildNode(true)}
          variant="primary"
          ariaLabel="Add left Node"
        >
          Add Left Child
        </Button>
        <Button
          onClick={() => addChildNode(false)}
          variant="primary"
          ariaLabel="Add right Node"
        >
          Add Right Child
        </Button>

        <Button onClick={editNodeValue} variant="warning" ariaLabel="Edit Node">
          Edit Node
        </Button>

        <Button onClick={deleteNode} variant="danger" ariaLabel="Delete Node">
          Delete Node
        </Button>
      </div>
      <div className="flex space-x-2">
        <Button
          onClick={handleMaxLeafToAnyPath}
          variant="success"
          ariaLabel="Calculate Max Leaf to any node"
        >
          Max Leaf to Any Path
        </Button>

        <Button
          onClick={handleMaxAnyToAnyPath}
          variant="success"
          ariaLabel="Calculate Max any node to any node"
        >
          Max Any to Any Path
        </Button>

        <Button onClick={saveTree} variant="info" ariaLabel="Save">
          Save Tree
        </Button>
      </div>
    </div>
  );
};

export default TreeActions;
