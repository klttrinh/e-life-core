import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ExportTypeEnum } from '../../export/export-type.enum';
import { PaginationQueryDto } from '../../general/dtos/pagination.query.dto';
import { DatabaseNotificationTypesEnum } from '../enums/database.notification.types.enum';
import { ServicesEnum } from '../../../general/enums/service.type.enum';

export class DatabaseAuditExportDto extends PaginationQueryDto {
  @ApiProperty({ enum: ServicesEnum, example: ServicesEnum.PAYMENT_GATEWAY_API })
  @IsEnum(ServicesEnum)
  service: ServicesEnum;

  @ApiPropertyOptional({ example: new Date().toISOString() })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ example: new Date().toISOString() })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  entryId?: number;

  @ApiPropertyOptional({ example: 'merchants' })
  @IsString()
  @IsOptional()
  tableName?: string;

  @ApiPropertyOptional({ enum: DatabaseNotificationTypesEnum, example: DatabaseNotificationTypesEnum.INSERT })
  @IsEnum(DatabaseNotificationTypesEnum)
  @IsOptional()
  action?: DatabaseNotificationTypesEnum;
}
