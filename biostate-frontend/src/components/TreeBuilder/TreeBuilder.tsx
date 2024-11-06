import React, { useEffect, useState } from "react";
import TreeWrapper from "./TreeWrapper";
import TreeActions from "./TreeActions";
import { TreeNode } from "../../types/TreeNode";
import { useTreeMutations } from "../../customHooks/useTreeMutations";
import { serializeTree, transformTreeToD3 } from "../../utils/treeBuilder";
import { showToast } from "../../utils/toast";

interface TreeBuilderProps {
  defaultInput: any;
}

const TreeBuilder: React.FC<TreeBuilderProps> = ({ defaultInput }) => {
  const [treeData, setTreeData] = useState<TreeNode>(
    defaultInput || new TreeNode(10)
  );
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);
  const [maxSum, setMaxSum] = useState<number | null>(null);

  const { mutateAny, mutateLeaf, mutateSaveTree } = useTreeMutations(
    setMaxSum,
    setHighlightedNodes
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "a") {
        addChildNode(true);
      } else if (event.key === "d") {
        addChildNode(false);
      } else if (event.key === "e") {
        editNodeValue();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedNode, treeData]);

  const handleNodeClick = (nodeData: any) => {
    setSelectedNode(nodeData);
  };

  const addChildNode = (isLeft: boolean) => {
    if (!selectedNode) {
      showToast("warning", "select a node to add");
      return;
    }
    const newValueStr = prompt("Enter node value:");
    const newValue = parseInt(newValueStr || "", 10);
    if (isNaN(newValue)) {
      alert("Please enter a valid number.");
      return;
    }

    const newNode = new TreeNode(newValue);
    const attachNode = (node: TreeNode) => {
      if (node.id === selectedNode.attributes.id) {
        if (isLeft) {
          if (node.left) {
            alert("Left child already exists.");
          } else {
            node.left = newNode;
          }
        } else {
          if (node.right) {
            alert("Right child already exists.");
          } else {
            node.right = newNode;
          }
        }
      } else {
        if (node.left) attachNode(node.left);
        if (node.right) attachNode(node.right);
      }
    };

    const newTreeData = { ...treeData };
    attachNode(newTreeData);
    setTreeData(newTreeData);
  };

  const editNodeValue = () => {
    if (!selectedNode) {
      showToast("warning", "select a node to edit");
      return;
    }
    const newValueStr = prompt("Enter new node value:");
    const newValue = parseInt(newValueStr || "", 10);
    if (isNaN(newValue)) {
      alert("Please enter a valid number.");
      return;
    }

    const updateNodeValue = (node: TreeNode) => {
      if (node.id === selectedNode.attributes.id) {
        node.value = newValue;
      } else {
        if (node.left) updateNodeValue(node.left);
        if (node.right) updateNodeValue(node.right);
      }
    };

    const newTreeData = { ...treeData };
    updateNodeValue(newTreeData);
    setTreeData(newTreeData);
  };

  const deleteNode = () => {
    if (!selectedNode) {
      showToast("warning", "select a node to delete");
      return;
    }
    if (selectedNode.attributes.id === treeData.id) {
      alert("Cannot delete root node.");
      return;
    }

    const removeNode = (node: TreeNode | null) => {
      if (!node) return;
      if (node.left && node.left.id === selectedNode.attributes.id) {
        node.left = null;
      } else if (node.right && node.right.id === selectedNode.attributes.id) {
        node.right = null;
      } else {
        removeNode(node.left);
        removeNode(node.right);
      }
    };

    const newTreeData = { ...treeData };
    removeNode(newTreeData);
    setTreeData(newTreeData);
    setSelectedNode(null);
  };

  const handleMaxLeafToAnyPath = () => {
    const serializedTree = serializeTree(treeData);
    mutateLeaf(serializedTree);
  };

  const handleMaxAnyToAnyPath = () => {
    const serializedTree = serializeTree(treeData);
    mutateAny(serializedTree);
  };

  const saveTree = () => {
    const serializedTree = serializeTree(treeData);
    mutateSaveTree(serializedTree);
  };

  const d3TreeData = [transformTreeToD3(treeData)];

  return (
    <div className="flex flex-col items-center">
      <TreeWrapper
        d3TreeData={d3TreeData}
        selectedNode={selectedNode}
        highlightedNodes={highlightedNodes}
        handleNodeClick={handleNodeClick}
      />
      {maxSum !== null && (
        <div className="mt-2">
          <strong>Maximum Sum:</strong> {maxSum}
          <span className="text-xs italic ml-2">
            path highlighted by yellow nodes
          </span>
        </div>
      )}
      <TreeActions
        addChildNode={addChildNode}
        editNodeValue={editNodeValue}
        deleteNode={deleteNode}
        handleMaxLeafToAnyPath={handleMaxLeafToAnyPath}
        handleMaxAnyToAnyPath={handleMaxAnyToAnyPath}
        saveTree={saveTree}
      />
    </div>
  );
};

export default TreeBuilder;
