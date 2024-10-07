import { IsArray, IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ErrorLevelEnum } from '../enums/error.level.enum';
import { ServicesEnum } from '../../../general';

export class NotificationErrorDto {
  @IsOptional()
  @IsString()
  exceptionStack?: string;

  @IsOptional()
  @IsString()
  exceptionMessage?: string;

  @IsString()
  description: string;

  @IsString()
  level: ErrorLevelEnum;

  @IsEnum(ServicesEnum)
  service: ServicesEnum;

  @IsArray()
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  recipientRoles?: number[];

  @IsNumber()
  @IsOptional()
  merchantId?: number;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  actions?: 'below_threshold_email'[];

  @IsObject()
  @IsOptional()
  additionalInfo?: object;
}
