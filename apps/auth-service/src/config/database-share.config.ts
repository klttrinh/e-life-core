import { registerAs } from '@nestjs/config';
import { env } from 'process';
import { type DatabaseShareConfig } from '@e-life/share-libraries';

export const databaseShareConfig = registerAs(
  'databaseShare',
  (): DatabaseShareConfig => ({
    host: env.DB_SHARE_HOST,
    port: +env.DB_SHARE_PORT,
    database: env.DB_SHARE_NAME,
    username: env.DB_SHARE_USERNAME,
    password: env.DB_SHARE_PASSWORD,
    ssl: env.DB_SHARE_SSL === 'true',
  }),
);
