import { Module } from '@nestjs/common';
import { EncryptionController } from './encryption.controller';
import { EncryptionService } from './encryption.service';

@Module({
  providers: [EncryptionService],
  controllers: [EncryptionController],
  exports: [EncryptionService],
})
export class EncryptionModule {}
