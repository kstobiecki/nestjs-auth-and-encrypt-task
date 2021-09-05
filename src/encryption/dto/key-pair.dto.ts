import { ApiProperty } from '@nestjs/swagger';

export class KeyPairDto {
  @ApiProperty()
  privKey: string;

  @ApiProperty()
  pubKey: string;
}
