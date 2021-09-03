import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from './database.constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () =>
      await createConnection({
        type: 'sqlite',
        database: ':memory:',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
