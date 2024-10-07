import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { NotificationTypesEnum } from '../enums/notification.types.enum';

export class NotificationCreateDto {
  @ApiProperty({ example: 'message title' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ example: 'message details' })
  @IsString()
  @IsNotEmpty()
  details: string;

  @ApiPropertyOptional({ example: 3 })
  @IsNumber()
  @IsOptional()
  assignedTo?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsNumber()
  @IsOptional()
  assignedBy?: number;

  @ApiProperty({ example: NotificationTypesEnum.ERROR })
  @IsEnum(NotificationTypesEnum)
  type: NotificationTypesEnum;

  @ApiPropertyOptional({ example: { id: 12345 } })
  @IsObject()
  @IsOptional()
  additionalInfo?: object;

  @ApiPropertyOptional({ example: [2] })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @IsArray()
  recipientRoles?: number[];

  @ApiPropertyOptional({ example: [1] })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @IsArray()
  recipientAdminIds?: number[];

  @ApiPropertyOptional({ example: ['test@xcoins.com'] })
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  recipientAdminEmails?: string[];

  @ApiPropertyOptional({ example: 3 })
  @IsNumber()
  @IsOptional()
  merchantId?: number;

  @ApiPropertyOptional({ example: ['below_threshold_email'] })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  actions?: 'below_threshold_email'[];
}
