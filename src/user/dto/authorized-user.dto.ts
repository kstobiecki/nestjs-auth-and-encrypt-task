import { IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AuthorizedUserDto extends UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  authToken: string;
}
