import { Injectable } from '@nestjs/common';
import { BinaryTree } from './binary-tree.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class BinaryTreesService {
  constructor(
    @InjectRepository(BinaryTree)
    private binaryTreeRepository: Repository<BinaryTree>,
  ) {}

  maxLeafToNodePathSum(root: TreeNode): { sum: number; path: TreeNode[] } {
    let maxSum = -Infinity;
    let maxPath: TreeNode[] = [];

    const dfs = (
      node: TreeNode | null,
    ): { maxSumFromNode: number; pathFromNode: TreeNode[] } => {
      if (!node) {
        return { maxSumFromNode: -Infinity, pathFromNode: [] };
      }

      if (!node.left && !node.right) {
        if (node.value > maxSum) {
          maxSum = node.value;
          maxPath = [node];
        }
        return { maxSumFromNode: node.value, pathFromNode: [node] };
      }

      const left = dfs(node.left);
      const right = dfs(node.right);
      let maxChildSum = left.maxSumFromNode;
      let pathFromNode = left.pathFromNode;

      if (right.maxSumFromNode > left.maxSumFromNode) {
        maxChildSum = right.maxSumFromNode;
        pathFromNode = right.pathFromNode;
      }

      const maxSumFromNode = node.value + maxChildSum;
      const currentPath = [node, ...pathFromNode];

      if (maxSumFromNode > maxSum) {
        maxSum = maxSumFromNode;
        maxPath = currentPath;
      }

      return { maxSumFromNode, pathFromNode: currentPath };
    };

    dfs(root);
    return { sum: maxSum, path: maxPath };
  }

  maxPathSumAny(root: TreeNode): { sum: number; path: TreeNode[] } {
    let maxSum = -Infinity;
    let maxPath: TreeNode[] = [];

    const dfs = (
      node: TreeNode | null,
    ): { maxBranchSum: number; maxPathNodes: TreeNode[] } => {
      if (!node) return { maxBranchSum: 0, maxPathNodes: [] };

      const left = dfs(node.left);
      const right = dfs(node.right);

      const maxChildSum = Math.max(left.maxBranchSum, right.maxBranchSum);
      const maxBranchSum = Math.max(node.value, node.value + maxChildSum);

      const maxRootSum = Math.max(
        maxBranchSum,
        node.value + left.maxBranchSum + right.maxBranchSum,
      );

      if (maxRootSum > maxSum) {
        maxSum = maxRootSum;
        if (
          node.value + left.maxBranchSum + right.maxBranchSum ===
          maxRootSum
        ) {
          maxPath = [
            ...left.maxPathNodes.reverse(),
            node,
            ...right.maxPathNodes,
          ];
        } else if (node.value + maxChildSum === maxRootSum) {
          maxPath =
            maxChildSum === left.maxBranchSum
              ? [...left.maxPathNodes, node]
              : [...right.maxPathNodes, node];
        } else {
          maxPath = [node];
        }
      }

      const maxPathNodes =
        maxChildSum === left.maxBranchSum
          ? [...left.maxPathNodes, node]
          : [...right.maxPathNodes, node];

      return { maxBranchSum, maxPathNodes };
    };

    dfs(root);
    return { sum: maxSum, path: maxPath };
  }

  calculateBinaryTree(input: any): {
    input: any;
    maxLeafToNodeSum: number;
    maxLeafToNodePath: any[];
    maxAnyNodeSum: number;
    maxAnyNodePath: any[];
  } {
    const maxLeafToNodeSum = this.maxLeafToNodePathSum(input);
    const maxAnyNodeSum = this.maxPathSumAny(input);

    return {
      input: input,
      maxLeafToNodeSum: maxLeafToNodeSum.sum,
      maxLeafToNodePath: maxLeafToNodeSum.path,
      maxAnyNodeSum: maxAnyNodeSum.sum,
      maxAnyNodePath: maxAnyNodeSum.path,
    };
  }

  async saveBinaryTreeWithCalculatedValues(
    input: (number | null)[],
    maxLeafToNodeSum: number,
    maxLeafToNodePath: TreeNode[],
    maxAnyNodeSum: number,
    maxAnyNodePath: number[],
    user: any,
  ): Promise<BinaryTree> {
    const binaryTree = this.binaryTreeRepository.create({
      input,
      maxLeafToNodeSum,
      maxLeafToNodePath,
      maxAnyNodeSum,
      maxAnyNodePath,
      user: { id: user.userId } as User,
    });
    return this.binaryTreeRepository.save(binaryTree);
  }

  async saveBinaryTree(input: any, user: any): Promise<BinaryTree> {
    const binaryTree = this.binaryTreeRepository.create({
      input,
      user: { id: user.userId } as User,
    });
    return this.binaryTreeRepository.save(binaryTree);
  }

  async getBinaryTrees(): Promise<BinaryTree[]> {
    return this.binaryTreeRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getBinaryTreesForUser(user: any): Promise<BinaryTree[]> {
    return this.binaryTreeRepository.find({
      where: { user: user.userId },
      order: { createdAt: 'DESC' },
    });
  }
}

export class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  id: string;
  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.id = Math.random().toString(36).slice(2, 11);
  }
}
