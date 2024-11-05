// binary-trees/dto/create-binary-tree.dto.ts
import { IsArray, IsNumber, Allow } from 'class-validator';

export class CreateBinaryTreeDto {
  @Allow()
  input: any;
}
