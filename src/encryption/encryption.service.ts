import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserDto } from '../user/dto';
import { KeyPairDto } from './dto';
import { UserService } from '../user/user.service';
import { PUB_KEY_REPOSITORY } from './encryption.constants';
import { Repository } from 'typeorm';
import { PubKey } from './entity';
import { User } from '../user/user.entity';
import { generateKeyPairSync } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EncryptionService {
  constructor(
    @Inject(PUB_KEY_REPOSITORY)
    private pubKeyRepository: Repository<PubKey>,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  private async save(pubKey: string, user: User): Promise<void> {
    Logger.debug({
      message: `[savePubKey] save pubKey ${pubKey} to user ${user}`,
    });
    user.pubKey = await this.pubKeyRepository.save({ pubKey });
    await this.userService.update(user);
  }

  private async deleteByUserId(userId: string): Promise<void> {
    Logger.debug({
      message: `[deleteByUserId] delete pubKey by userId ${userId} if exists`,
    });
    const pubKey = await this.findOneByUserId(userId);
    if (pubKey) {
      await this.pubKeyRepository.remove(pubKey);
    }
  }

  private async findOneByUserId(userId: string): Promise<PubKey> {
    Logger.debug({
      message: `[findOneByUserId] findOne pubKey by userId ${userId}`,
    });
    return this.pubKeyRepository.findOne({
      relations: ['user'],
      where: { user: { id: userId } },
    });
  }

  private generateKeyPairSync(): KeyPairDto {
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

  async generateKeyPair(user: UserDto): Promise<KeyPairDto> {
    const userEntity: User = await this.userService.findOne(user);
    const { pubKey, privKey } = this.generateKeyPairSync();
    await this.deleteByUserId(userEntity.id);
    await this.save(pubKey, userEntity);

    Logger.debug({
      message: `[generateKeyPair] return keyPair`,
    });
    return Promise.resolve({ pubKey, privKey });
  }
}
