import { Injectable, Logger } from '@nestjs/common';
import { TwilioService as TwilioClient } from 'nestjs-twilio';
import Handlebars from 'handlebars';
import { ISms } from '../interfaces/sms';
import { SmsService } from '../sms.service';

@Injectable()
export class TwilioV2Service implements SmsService {
  private readonly logger = new Logger(TwilioV2Service.name);

  constructor(private readonly twilioClient: TwilioClient) {}

  async lookupPhoneNumber(phoneNumber: string): Promise<any> {
    try {
      const res = await this.twilioClient.client.lookups.v2
        .phoneNumbers(phoneNumber)
        .fetch({ fields: 'line_type_intelligence' });
      this.logger.log('lookup', { res });
      return res;
    } catch (error) {
      this.logger.error('[lookupPhoneNumber]', error);
      throw Error(error);
    }
  }

  async sendSms(sms: ISms): Promise<boolean> {
    if (sms.data) {
      const template = Handlebars.compile(sms.text);
      sms.text = template(sms.data);
    }

    try {
      const res = await this.twilioClient.client.messages.create({
        body: sms.text,
        to: sms.to,
        from: process.env.TWILIO_PHONE_NUMBER,
      });
      this.logger.log('sms sent', res);
      return true;
    } catch (error) {
      this.logger.error('[sendSms]', error);
      return false;
    }
  }
}
