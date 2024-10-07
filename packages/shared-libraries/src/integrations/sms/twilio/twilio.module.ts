import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TwilioModule as Twilio } from 'nestjs-twilio';
import { TwilioService } from './twilio.service';
import { TwilioV2Service } from './twilio.v2.service';

@Module({
  imports: [
    Twilio.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        accountSid: config.get('TWILIO_ACCOUNT_SID'),
        authToken: config.get('TWILIO_AUTH_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TwilioService, TwilioV2Service],
  exports: [TwilioService, TwilioV2Service],
})
export class TwilioModule {}
