import { Controller, Request, Post, UseGuards, Logger } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBody,
} from '@nestjs/swagger';
import { TokenDto } from './dto';
import { UserCredentialsDto } from '../user/dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  @ApiOperation({
    summary: 'Sign in an user',
  })
  @ApiCreatedResponse({
    description: 'Successfully authorized an user',
    type: TokenDto,
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized',
  })
  @ApiBody({ type: UserCredentialsDto })
  async signIn(@Request() req) {
    Logger.debug({ message: '[signIn] Requested to sign in an user' });
    return this.authService.signIn(req.user);
  }
}
