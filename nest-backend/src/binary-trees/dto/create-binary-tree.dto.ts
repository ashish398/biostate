import { Allow } from 'class-validator';

export class CreateBinaryTreeDto {
  @Allow()
  input: any;
}
