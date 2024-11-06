import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class CreateSubstringDto {
  @ApiProperty({
    example: 'exampleInput',
    description:
      'The string input for which the substring result will be calculated',
  })
  @IsString()
  @Matches(/^[\w\s.,!?'-]+$/, { message: 'Invalid input string dto' })
  input: string;
}
