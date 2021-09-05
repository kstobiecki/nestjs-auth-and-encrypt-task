import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserCredentialsDto extends UserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  password: string;
}
