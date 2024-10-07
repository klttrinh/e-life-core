import { Injectable, Logger } from '@nestjs/common';
import { S3 } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { SystemSettingService } from '../system-setting';
import { PanelEnum } from './enums/panel.enum';
import { HealthStatusReturnType } from '../../interfaces';

export interface IS3File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
  merchantId?: number;
  roles?: number[];
  description?: string;
  panelPrefix: PanelEnum;
}

export interface IS3Response {
  ETag: string;
  Location: string;
  key?: string;
  Key?: string;
  Bucket: string;
}
@Injectable()
export class UploaderService {
  private readonly logger = new Logger(UploaderService.name);

  private readonly s3: S3;

  constructor(private configService: ConfigService, private settingService: SystemSettingService) {
    this.s3 = new S3({
      forcePathStyle: true,
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_S3_KEY_SECRET'),
      },
      endpoint: this.configService.get('AWS_S3_ENDPOINT'),
      region: this.configService.get('AWS_S3_REGION'),
    });
  }

  public async uploadFile(file: IS3File): Promise<IS3Response> {
    const { originalname } = file;
    try {
      const bucket = await this.settingService.getAwsS3Bucket();
      this.logger.log({
        log: 'Trying to upload file from S3 bucket',
        originalname,
      });
      const res = await this.s3_upload(file.buffer, bucket, originalname);
      return res as any;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getFile(fileName: string): Promise<any> {
    const bucket = await this.settingService.getAwsS3Bucket();

    this.logger.log({
      log: 'Trying to get file from S3 bucket',
      fileName,
      bucket,
    });

    return this.s3.getObject({
      Bucket: bucket,
      Key: fileName,
    });
  }

  public async delete(filename: string): Promise<any> {
    const bucket = await this.settingService.getAwsS3Bucket();

    this.logger.log({
      log: 'Trying to delete file from S3 bucket',
      filename,
      bucket,
    });
    return (this.s3.deleteObject({ Bucket: bucket, Key: filename }) as any).promise();
  }

  private async s3_upload(file: Buffer, bucket: string, name: string) {
    return this.s3.putObject({
      Bucket: bucket,
      Body: file,
      Key: name,
      ChecksumAlgorithm: 'SHA256',
      ChecksumSHA256: crypto.createHash('sha256').update(file).digest('base64'),
    });
  }

  public async healthStatus(): Promise<HealthStatusReturnType> {
    const bucket = await this.settingService.getAwsS3Bucket();
    const status = (await this.s3
      .headBucket({
        Bucket: bucket,
      })
      .then(() => 'up')
      .catch(() => 'down')) as any;

    return { s3: { status } };
  }
}
