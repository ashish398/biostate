import { useMutation } from "react-query";
import {
  calculateMaxPathAny,
  calculateMaxPathLeaf,
  saveTree,
} from "../api/post";
import { showToast } from "../utils/toast";

export const useTreeMutations = (setMaxSum: any, setHighlightedNodes: any) => {
  const { mutate: mutateAny } = useMutation(
    (tree: any) => calculateMaxPathAny(tree),
    {
      onSuccess: (data) => {
        setMaxSum(data.sum);
        setHighlightedNodes(data.path.map((node: any) => node.id));
      },
    }
  );

  const { mutate: mutateLeaf } = useMutation(
    (tree: any) => calculateMaxPathLeaf(tree),
    {
      onSuccess: (data) => {
        setMaxSum(data.sum);
        setHighlightedNodes(data.path.map((node: any) => node.id));
      },
    }
  );

  const { mutate: mutateSaveTree } = useMutation(
    (tree: any) => saveTree(tree),
    {
      onSuccess: () => {
        showToast("success", "Tree saved successfully.");
      },
      onError: (error) => {
        showToast("error", "Failed to save the tree.");
      },
    }
  );

  return { mutateAny, mutateLeaf, mutateSaveTree };
};
