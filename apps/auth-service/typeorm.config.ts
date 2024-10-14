import { env } from 'node:process';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: env.DB_SHARE_HOST,
  port: +(env.DB_SHARE_PORT || '5432'),
  database: env.DB_SHARE_NAME,
  username: env.DB_SHARE_USERNAME,
  password: env.DB_SHARE_PASSWORD,
  ssl: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['database/migrations/*.ts'],
});
