import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { KeyPairDto } from '../encryption/dto';
import { constants, generateKeyPairSync, publicEncrypt } from 'crypto';

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

  generateKeyPairSync(): KeyPairDto {
    Logger.debug({
      message: `[generateKeyPairSync] return keyPair`,
    });
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: this.configService.get<string>('encryption.passphrase'),
      },
    });

    return { pubKey: publicKey, privKey: privateKey };
  }

  encrypt(file: Express.Multer.File, pubKey: string): string {
    Logger.debug({
      message: `[encrypt] return encrypted file`,
    });
    const encrypted = publicEncrypt(
      {
        key: pubKey,
        padding: constants.RSA_NO_PADDING,
      },
      file.buffer,
    );

    return encrypted.toString();
  }
}
