// substrings/dto/create-substring.dto.ts
import { IsString, Matches } from 'class-validator';

export class CreateSubstringDto {
  @IsString()
  @Matches(/^[\w\s.,!?'-]+$/, { message: 'Invalid input string dto' })
  input: string;
}
