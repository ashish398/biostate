import { useMutation } from "react-query";
import { postPathSum } from "../api/post";

export type TreeNode = {
  name: string;
  children: TreeNode[];
  highlighted?: boolean;
};

export const useTreeConversion = () => {
  const arrayToTree = (arr: (number | null)[], index = 0): any => {
    if (index >= arr.length || arr[index] === null) return null;

    const node: TreeNode = {
      name: arr[index]?.toString() || "",
      children: [],
      highlighted: true,
    };

    node.children.push(arrayToTree(arr, 2 * index + 1));
    node.children.push(arrayToTree(arr, 2 * index + 2));

    node.children = node.children.filter(
      (child) => child !== null
    ) as TreeNode[];
    return node;
  };

  const calculatePathSums = async (binaryTree: (number | null)[]) => {
    const response: any = await postPathSum({ input: binaryTree });
    return response.data;
  };

  const mutation = useMutation((binaryTree: (number | null)[]) =>
    calculatePathSums(binaryTree)
  );

  return { arrayToTree, mutation };
};
