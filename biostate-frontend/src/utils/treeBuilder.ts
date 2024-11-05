import { TreeNode } from "../types/TreeNode";

export const serializeTree = (node: TreeNode | null): any => {
  if (!node) return null;
  return {
    value: node.value,
    id: node.id,
    left: serializeTree(node.left),
    right: serializeTree(node.right),
  };
};

export const parseTree = (data: any): TreeNode => {
  const node = new TreeNode(data.value, null, null, data.id);
  if (data.left) {
    node.left = parseTree(data.left);
  }
  if (data.right) {
    node.right = parseTree(data.right);
  }
  return node;
};

export const transformTreeToD3 = (node: TreeNode | null): any | null => {
  if (!node) return null;

  const children: any[] = [];
  if (node.left) {
    const leftChild = transformTreeToD3(node.left);
    if (leftChild) children.push(leftChild);
  }
  if (node.right) {
    const rightChild = transformTreeToD3(node.right);
    if (rightChild) children.push(rightChild);
  }

  return {
    name: node.value.toString(),
    attributes: {
      id: node.id,
    },
    children: children.length > 0 ? children : undefined,
  };
};
