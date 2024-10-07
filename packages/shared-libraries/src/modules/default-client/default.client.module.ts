import { DynamicModule, Global, Module } from '@nestjs/common';
import { DefaultClientService } from './default.client.service';

@Global()
@Module({})
export class DefaultClientModule {
  static register(): DynamicModule {
    return {
      global: true,
      imports: [],
      module: DefaultClientModule,
      providers: [DefaultClientService],
      exports: [DefaultClientService],
    };
  }
}
