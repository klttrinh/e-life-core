import { Injectable } from '@nestjs/common';
import { ISms } from './interfaces/sms';

@Injectable()
export abstract class SmsService {
  // should return success
  abstract sendSms(sms: ISms): Promise<boolean>;

  abstract lookupPhoneNumber(phoneNumber: string): Promise<any>;
}
