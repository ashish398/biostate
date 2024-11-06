import { Test, TestingModule } from '@nestjs/testing';
import { BinaryTreesService, TreeNode } from './binary-trees.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BinaryTree } from './binary-tree.entity';
import { Repository } from 'typeorm';

describe('BinaryTreesService', () => {
  let service: BinaryTreesService;
  let repository: Repository<BinaryTree>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BinaryTreesService,
        {
          provide: getRepositoryToken(BinaryTree),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BinaryTreesService>(BinaryTreesService);
    repository = module.get<Repository<BinaryTree>>(
      getRepositoryToken(BinaryTree),
    );
  });

  describe('maxLeafToNodePathSum', () => {
    it('should return the correct max path sum for a leaf node', () => {
      const root = new TreeNode(10);
      root.left = new TreeNode(5);
      root.right = new TreeNode(15);
      root.left.left = new TreeNode(3);
      root.left.right = new TreeNode(7);

      const result = service.maxLeafToNodePathSum(root);

      expect(result.sum).toEqual(25);
      expect(result.path).toHaveLength(2);
    });

    it('should handle a tree with only one node', () => {
      const root = new TreeNode(10);
      const result = service.maxLeafToNodePathSum(root);

      expect(result.sum).toEqual(10);
    });

    it('should handle a tree with negative values', () => {
      const root = new TreeNode(-10);
      root.left = new TreeNode(-20);
      root.right = new TreeNode(-30);

      const result = service.maxLeafToNodePathSum(root);

      expect(result.sum).toEqual(-30);
    });
  });

  describe('maxPathSumAny', () => {
    it('should return the correct max path sum for any nodes', () => {
      const root = new TreeNode(10);
      root.left = new TreeNode(5);
      root.right = new TreeNode(15);
      root.left.left = new TreeNode(3);
      root.left.right = new TreeNode(7);
      root.right.right = new TreeNode(20);

      const result = service.maxPathSumAny(root);

      expect(result.sum).toEqual(57);
    });

    it('should handle a tree with only one node', () => {
      const root = new TreeNode(10);
      const result = service.maxPathSumAny(root);

      expect(result.sum).toEqual(10);
    });

    it('should handle a tree with negative values', () => {
      const root = new TreeNode(-10);
      root.left = new TreeNode(-20);
      root.right = new TreeNode(-30);

      const result = service.maxPathSumAny(root);

      expect(result.sum).toEqual(-10);
    });
  });
});
