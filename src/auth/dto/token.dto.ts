import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty()
  authToken: string;
}
