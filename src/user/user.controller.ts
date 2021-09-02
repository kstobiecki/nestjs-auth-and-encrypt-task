import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserCredentialsDto, UserDto } from './dto';
import { UserService } from './user.service';
import { plainToClass } from 'class-transformer';
import { User } from './user.entity';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create an user',
  })
  @ApiCreatedResponse({
    description: 'Successfully created an user',
    type: UserDto,
  })
  @ApiBadRequestResponse({
    description: 'User not created',
  })
  @ApiConflictResponse({
    description: 'User already exists',
  })
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() user: UserCredentialsDto): Promise<UserDto> {
    const savedUser: User = await this.userService.create(user);
    return plainToClass(User, savedUser);
  }
}
