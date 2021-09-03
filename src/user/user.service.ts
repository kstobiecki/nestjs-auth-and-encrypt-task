import { Injectable, Inject, ConflictException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { USER_REPOSITORY } from './user.tokens';
import { User } from './user.entity';
import { UserCredentialsDto } from './dto';
import { ErrorMessageEnum } from '../enums';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}

  async create(user: UserCredentialsDto): Promise<User> {
    Logger.debug({ message: '[create] check if user exists' });
    const isUserDuplicated: User = await this.userRepository.findOne({
      email: user.email,
    });
    if (isUserDuplicated) {
      Logger.debug({ message: '[create - error] user already exists' });
      throw new ConflictException({
        message: 'User not created',
        error: ErrorMessageEnum.USER_ALREADY_EXISTS,
      });
    }
    Logger.debug({ message: '[create] insert user' });
    return this.userRepository.save(user);
  }
}
