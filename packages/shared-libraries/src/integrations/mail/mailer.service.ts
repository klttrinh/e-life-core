import NodeMailer from 'nodemailer';
import { Injectable, Logger } from '@nestjs/common';
import Handlebars from 'handlebars';
import sgMail from '@sendgrid/mail';
import { IEmail } from './interfaces/email';
import { SystemSettingService } from '../../modules';
import { MailClientTypeEnum } from './enums/mail.client.type.enum';
import { isReleaseEnv, RELEASE_ENV, releaseEnv } from '../../utils';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);

  constructor(private settingService: SystemSettingService) {
    if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }
  }

  private readonly transporter = NodeMailer.createTransport({
    host: process.env.MAILER_HOST,
    port: +process.env.MAILER_PORT,
    secure: JSON.parse(process.env.MAILER_SECURE), // true for 465, false for other ports
    auth: {
      user: process.env.MAILER_USER, // generated ethereal user
      pass: process.env.MAILER_PASS, // generated ethereal password
    },
  });

  public async sendMail(mail: IEmail): Promise<void> {
    try {
      let template = Handlebars.compile(mail.subject);
      const subject = template(mail.data);

      template = Handlebars.compile(mail.text ?? mail.html);
      const content = template(mail.data);

      const fromEmail = mail.fromEmail ?? (await this.settingService.getFromEmail());
      let fromName = mail.fromName ?? (await this.settingService.getFromName());
      const defaultEmailClient = await this.settingService.getDefaultMailClient();

      this.logger.log('Sending mail', {
        subject,
        fromEmail,
        fromName,
        defaultEmailClient,
        data: mail.data,
      });
      fromName = `${fromName}${
        !isReleaseEnv(RELEASE_ENV.PRODUCTION) && !isReleaseEnv(RELEASE_ENV.PRE_PRODUCTION) ? ` [${releaseEnv()}]` : ''
      }`;
      if (defaultEmailClient === MailClientTypeEnum.SEND_GRID) {
        const message = {
          from: {
            email: fromEmail,
            name: fromName,
          },
          to: mail.to,
          subject,
          html: content,
        };
        const res = await sgMail.send(message);
        this.logger.log('SEND_GRID response after sending mail  ', {
          res,
        });
      }
      if (defaultEmailClient === MailClientTypeEnum.MAIL_TRAP) {
        const emailFromSMTP = { address: fromEmail, name: fromName };
        const message = {
          from: emailFromSMTP,
          to: mail.to,
          subject,
          html: content,
        };
        await this.transporter.sendMail(message);
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
