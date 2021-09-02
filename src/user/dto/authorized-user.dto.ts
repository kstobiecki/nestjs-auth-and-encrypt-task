import { IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class AuthorizedUserDto extends UserDto {
  @IsString()
  @IsNotEmpty()
  authToken: string;
}
