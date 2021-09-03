import { Connection } from 'typeorm';
import { User } from './user.entity';
import { DATABASE_CONNECTION } from '../database/database.constants';
import { USER_REPOSITORY } from './user.constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DATABASE_CONNECTION],
  },
];
