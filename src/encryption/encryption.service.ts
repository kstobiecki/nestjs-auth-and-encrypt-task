import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserDto } from '../user/dto';
import { KeyPairDto } from './dto';
import { UserService } from '../user/user.service';
import { PUB_KEY_REPOSITORY } from './encryption.constants';
import { Repository } from 'typeorm';
import { PubKey } from './entity';
import { User } from '../user/user.entity';

@Injectable()
export class EncryptionService {
  constructor(
    @Inject(PUB_KEY_REPOSITORY)
    private pubKeyRepository: Repository<PubKey>,
    private userService: UserService,
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

  async generateKeyPair(user: UserDto): Promise<KeyPairDto> {
    const userEntity: User = await this.userService.findOne(user);
    const pubKey = 'asd';
    await this.deleteByUserId(userEntity.id);
    await this.save(pubKey, userEntity);

    Logger.debug({
      message: `[generateKeyPair] return keyPair ${pubKey}`,
    });
    return Promise.resolve({ privKey: 'asd', pubKey });
  }
}
