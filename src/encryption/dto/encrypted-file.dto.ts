import { ApiProperty } from '@nestjs/swagger';

export class EncryptedFileDto {
  @ApiProperty()
  encryptedFile: string;
}
