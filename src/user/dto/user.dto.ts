import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
