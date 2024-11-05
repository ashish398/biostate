export interface D3TreeNode {
  name: string;
  attributes: {
    id: string;
  };
  children?: D3TreeNode[];
}
