import { registerAs } from '@nestjs/config';
import { env } from 'node:process';

export interface DatabaseShareConfig {
  host: string;

  port: number;

  database: string;

  username: string;

  password: string;

  ssl: boolean;
}

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
