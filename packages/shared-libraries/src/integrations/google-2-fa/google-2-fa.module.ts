import { Module, DynamicModule, Global } from '@nestjs/common';
import { Google2FaService } from './google-2-fa.service';

@Global()
@Module({})
export class Google2FaModule {
  static register(): DynamicModule {
    return {
      global: true,
      imports: [],
      module: Google2FaModule,
      providers: [Google2FaService],
      exports: [Google2FaService],
    };
  }
}
