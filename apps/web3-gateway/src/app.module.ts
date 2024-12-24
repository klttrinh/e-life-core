import { Module } from '@nestjs/common';
import { resolve } from 'node:path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { type Config } from './config';
import * as allConfig from './config';
import { LockSmartContractModule } from './lock-smart-contract';
import { TokenSmartContractModule } from './token-smart-contract';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [resolve(__dirname, '..', '.env'), resolve(__dirname, '..', '.env.example')],
      load: Object.values(allConfig),
      expandVariables: true,
      cache: true,
      isGlobal: true,
    }),
    // Database Shared Module
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config: ConfigService<Config>) => ({
        type: 'postgres',
        host: config.getOrThrow('databaseShare.host', { infer: true }),
        port: config.getOrThrow('databaseShare.port', { infer: true }),
        database: config.getOrThrow('databaseShare.database', { infer: true }),
        username: config.getOrThrow('databaseShare.username', { infer: true }),
        password: config.getOrThrow('databaseShare.password', { infer: true }),
        ssl: config.get('databaseShare.ssl', { infer: true }) && { rejectUnauthorized: false },
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    LockSmartContractModule,
    TokenSmartContractModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
