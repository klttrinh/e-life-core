import { Injectable, Logger } from '@nestjs/common';
import speakeasy, { GeneratedSecret } from 'speakeasy';
import { SystemSettingService } from '../../modules';

@Injectable()
export class Google2FaService {
  private readonly logger = new Logger(Google2FaService.name);

  constructor(private settingService: SystemSettingService) {}

  async generateAdminSecretKey(): Promise<GeneratedSecret> {
    const secret = speakeasy.generateSecret({
      name: await this.settingService.getAdminGoogleSecretName(),
    });

    return secret;
  }

  async generateMerchantSecretKey(): Promise<GeneratedSecret> {
    const secret = speakeasy.generateSecret({
      name: await this.settingService.getMerchantGoogleSecretName(),
    });

    return secret;
  }

  // eslint-disable-next-line class-methods-use-this
  async verifySecretKey(code: string, userSecret: string): Promise<boolean> {
    const verified = speakeasy.totp.verify({
      // this is ascii code when we generating key
      secret: userSecret,
      encoding: 'ascii',
      token: code,
    });

    return verified;
  }
}
