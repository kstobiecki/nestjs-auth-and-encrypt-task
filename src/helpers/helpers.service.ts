import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HelpersService {
  constructor(private configService: ConfigService) {}

  async passwordHash(password: string): Promise<string> {
    Logger.debug({ message: `[passwordHash] hash password` });
    const saltRounds = this.configService.get<string>('auth.saltRounds');
    const salt = await bcrypt.genSalt(parseInt(saltRounds));
    return bcrypt.hash(password, salt);
  }

  async passwordMatch(password: string, hash: string): Promise<boolean> {
    Logger.debug({ message: `[passwordMatch] compare password with hash` });
    return bcrypt.compare(password, hash);
  }
}
