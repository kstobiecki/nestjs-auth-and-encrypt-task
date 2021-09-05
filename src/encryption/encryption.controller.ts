import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { KeyPairDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/user.decorator';
import { UserDto } from '../user/dto';
import { EncryptionService } from './encryption.service';

@ApiTags('Encryption')
@ApiBearerAuth()
@Controller()
export class EncryptionController {
  constructor(private encryptionService: EncryptionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/generate-key-pair')
  @ApiOperation({
    summary: 'Generate key pair',
  })
  @ApiCreatedResponse({
    description: 'Successfully created key pair',
    type: KeyPairDto,
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized',
  })
  @HttpCode(HttpStatus.CREATED)
  async generateKeyPair(@User() user: UserDto): Promise<KeyPairDto> {
    Logger.debug({
      message: `[generateKeyPair] Requested to generate key pair for user ${user}`,
    });
    return this.encryptionService.generateKeyPair(user);
  }
}
