import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { HelpersService } from '../helpers/helpers.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private helpersService: HelpersService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    Logger.debug({ message: `[validateUser] find user by email ${email}` });
    const user = await this.userService.findOne({ email });
    const isMatch = user
      ? await this.helpersService.passwordMatch(pass, user.password)
      : false;
    if (isMatch) {
      Logger.debug({ message: `[validateUser] return user ${user}` });
      return user;
    }
    Logger.debug({
      message: `[validateUser] user with email ${email} not validated`,
    });
    return null;
  }

  async signIn(user: User) {
    Logger.debug({ message: `[signIn] return auth token for ${user}` });
    const payload = { email: user.email };
    return {
      authToken: this.jwtService.sign(payload),
    };
  }
}
