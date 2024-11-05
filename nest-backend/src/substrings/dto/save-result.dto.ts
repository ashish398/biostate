import { IsString, IsNumber, IsArray } from 'class-validator';

export class SaveResultDto {
  @IsString()
  input: string;

  @IsNumber()
  longestSubstringLength: number;

  @IsArray()
  @IsString({ each: true })
  uniqueSubstrings: string[];
}
