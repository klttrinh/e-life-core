/* eslint-disable max-classes-per-file */
import {
  IsOptional,
  IsNumber,
  IsDateString,
  IsString,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MerchantId {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'merchant' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class TransactionGetMerchantsFinanceDetailsDto {
  @ApiPropertyOptional({ example: new Date().toISOString() })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({ example: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000).toISOString() })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: [{ id: 1, name: 'merchant' }] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MerchantId)
  merchantIds?: MerchantId[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  settlementCurrencies?: string[];

  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
}
