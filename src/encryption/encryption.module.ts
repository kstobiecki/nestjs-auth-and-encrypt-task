import { Module } from '@nestjs/common';
import { EncryptionController } from './encryption.controller';
import { EncryptionService } from './encryption.service';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../database/database.module';
import { encryptionProviders } from './encryption.providers';
import { HelpersModule } from '../helpers/helpers.module';

@Module({
  imports: [UserModule, DatabaseModule, HelpersModule],
  providers: [EncryptionService, ...encryptionProviders],
  controllers: [EncryptionController],
  exports: [EncryptionService],
})
export class EncryptionModule {}
