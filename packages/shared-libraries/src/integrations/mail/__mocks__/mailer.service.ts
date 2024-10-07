import { Injectable } from '@nestjs/common';
import { IEmail } from '../interfaces/email';
import { SystemSettingService } from '../../../modules';

@Injectable()
export class MailerService {
  constructor(private settingService: SystemSettingService) {
    /* empty */
  }

  // eslint-disable-next-line class-methods-use-this
  public async sendMail(mail: IEmail): Promise<void> {
    /* empty */
  }
}
