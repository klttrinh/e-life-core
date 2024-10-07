import { DynamicModule, Global, Module } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Global()
@Module({})
export class MailerModule {
  static register(): DynamicModule {
    return {
      global: true,
      imports: [],
      module: MailerModule,
      providers: [MailerService],
      exports: [MailerService],
    };
  }
}
