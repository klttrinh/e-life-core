import { DynamicModule, CacheModule as NestCacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { ConfigService } from '@nestjs/config';
import { CacheService } from './cache.service';

export class CacheModule {
  static register(): DynamicModule {
    return {
      global: true,
      imports: [
        NestCacheModule.registerAsync({
          useFactory: (config: ConfigService) => {
            return {
              store: redisStore,
              host: config.get('REDIS_HOST'),
              port: config.get('REDIS_PORT'),
              db: config.get('REDIS_DB') || 0,
            };
          },
          inject: [ConfigService],
        }),
      ],
      module: CacheModule,
      providers: [CacheService],
      exports: [CacheService],
    };
  }
}
