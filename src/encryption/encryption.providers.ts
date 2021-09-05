import { PUB_KEY_REPOSITORY } from './encryption.constants';
import { Connection } from 'typeorm';
import { PubKey } from './entity';
import { DATABASE_CONNECTION } from '../database/database.constants';

export const encryptionProviders = [
  {
    provide: PUB_KEY_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(PubKey),
    inject: [DATABASE_CONNECTION],
  },
];
