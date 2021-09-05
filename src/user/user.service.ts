import {
  Injectable,
  Inject,
  ConflictException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { USER_REPOSITORY } from './user.constants';
import { User } from './user.entity';
import { UserCredentialsDto, UserDto } from './dto';
import { ErrorMessageEnum } from '../helpers/enums';
import { HelpersService } from '../helpers/helpers.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
    private helpersService: HelpersService,
  ) {}

  async findOne(opts: UserDto): Promise<User> {
    Logger.debug({ message: `[findOne] find user by ${opts}` });
    const user = await this.userRepository.findOne(opts);
    if (!user) {
      Logger.debug({ message: `[findOne] user not found by ${opts}` });
      throw new NotFoundException({
        message: 'User not found',
        error: ErrorMessageEnum.USER_NOT_FOUND,
      });
    }
    return user;
  }

  async create(user: UserCredentialsDto): Promise<User> {
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
    user.password = await this.helpersService.passwordHash(user.password);
    return this.userRepository.save(user);
  }

  async update(user: User): Promise<void> {
    Logger.debug({ message: `[update] update user ${user}` });
    await this.userRepository.save(user);
  }
}
