import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EncryptedFileDto, KeyPairDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/user.decorator';
import { UserDto } from '../user/dto';
import { EncryptionService } from './encryption.service';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @UseGuards(JwtAuthGuard)
  @Post('/encrypt')
  @ApiOperation({
    summary: 'Encrypt a file',
  })
  @ApiOkResponse({
    description: 'Successfully encrypted file',
    type: EncryptedFileDto,
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized',
  })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('fileToEncrypt'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fileToEncrypt: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async encrypt(
    @UploadedFile() file: Express.Multer.File,
    @User() user: UserDto,
  ): Promise<string> {
    Logger.debug({
      message: `[encrypt] Requested to encrypt a file for user ${user}`,
    });
    return this.encryptionService.encrypt(file, user);
  }
}
