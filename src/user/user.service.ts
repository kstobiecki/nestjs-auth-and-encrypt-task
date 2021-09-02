import {
  Injectable,
  Inject,
  ConflictException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { USER_REPOSITORY } from './user.tokens';
import { User } from './user.entity';
import { CreateUserDto } from './dto';
import { ErrorMessageEnum } from '../enums';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const isUserDuplicated: User = await this.userRepository.findOne({
      email: user.email,
    });
    if (isUserDuplicated) {
      throw new ConflictException({
        message: 'User not created',
        error: ErrorMessageEnum.USER_ALREADY_EXISTS,
      });
    }
    return this.userRepository.save(user);
  }
}
