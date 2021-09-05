import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HelpersModule } from '../helpers/helpers.module';

@Module({
  imports: [DatabaseModule, HelpersModule],
  providers: [...userProviders, UserService],
  controllers: [UserController],
  exports: [UserService, ...userProviders],
})
export class UserModule {}
