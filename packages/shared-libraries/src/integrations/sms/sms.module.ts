import { DynamicModule, Global, Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { TwilioService } from './twilio/twilio.service';
import { TwilioModule } from './twilio/twilio.module';

@Global()
@Module({})
export class SmsModule {
  static register(): DynamicModule {
    return {
      global: true,
      imports: [TwilioModule],
      module: SmsModule,
      providers: [{ provide: SmsService, useClass: TwilioService }],
      exports: [SmsService],
    };
  }
}
