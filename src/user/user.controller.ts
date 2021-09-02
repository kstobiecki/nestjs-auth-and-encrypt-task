import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto, UserDto } from './dto';
import { UserService } from './user.service';
import { plainToClass } from 'class-transformer';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() user: CreateUserDto): Promise<UserDto> {
    const savedUser: User = await this.userService.create(user);
    return plainToClass(User, savedUser);
  }
}
