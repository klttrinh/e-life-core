import { DynamicModule, Global, Module } from '@nestjs/common';
import { LockService } from './lock.service';

@Global()
@Module({})
export class LockModule {
  static register(): DynamicModule {
    return {
      global: true,
      imports: [],
      module: LockModule,
      providers: [LockService],
      exports: [LockService],
    };
  }
}
