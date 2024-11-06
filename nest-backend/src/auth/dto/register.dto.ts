import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'username123',
    description: 'Username for the new user',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password for the new user',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email for the new user',
  })
  @IsEmail()
  email: string;
}
