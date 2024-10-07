import { DynamicModule, Global, Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';

@Global()
@Module({})
export class UploaderModule {
  static register(): DynamicModule {
    return {
      global: true,
      imports: [],
      module: UploaderModule,
      providers: [UploaderService],
      exports: [UploaderService],
    };
  }
}
