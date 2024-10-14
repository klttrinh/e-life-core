import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
import { DataSource } from 'typeorm';

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get("DB_SHARE_HOST"),
  port: configService.get("DB_SHARE_PORT"),
  database: configService.get("DB_SHARE_NAME"),
  username: configService.get("DB_SHARE_USERNAME"),
  password: configService.get("DB_SHARE_PASSWORD"),
  ssl: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['database/migrations/*.ts'],
});
