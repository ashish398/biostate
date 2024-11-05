export class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  id: string;

  constructor(
    value: number,
    left: TreeNode | null = null,
    right: TreeNode | null = null,
    id: string | null = null
  ) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.id = id || Math.random().toString(36).substr(2, 9);
  }
}
