import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray } from 'class-validator';

export class SaveResultDto {
  @ApiProperty({
    example: 'exampleInput',
    description:
      'The input string for which the substring calculation was performed',
  })
  @IsString()
  input: string;

  @ApiProperty({
    example: 5,
    description:
      'The length of the longest unique substring found in the input',
  })
  @IsNumber()
  longestSubstringLength: number;

  @ApiProperty({
    example: ['abc', 'bca', 'cab'],
    description: 'An array of unique substrings derived from the input',
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  uniqueSubstrings: string[];
}
