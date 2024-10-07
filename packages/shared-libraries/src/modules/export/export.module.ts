import { Module, DynamicModule, Global } from '@nestjs/common';
import { ExportService } from './export.service';

@Global()
@Module({})
export class ExportModule {
  static register(): DynamicModule {
    return {
      global: true,
      imports: [],
      module: ExportModule,
      providers: [ExportService],
      exports: [ExportService],
    };
  }
}
