import { IsNumber, IsString, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AllCurrenciesEnum, FiatEnum } from '../../currency';

export class UpdateTransactionBatchDto {
  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiPropertyOptional({ example: `PG&1&/&${FiatEnum.EUR}&22/05/02}` })
  @IsString()
  @IsOptional()
  batchNumber?: string;

  @ApiPropertyOptional({ example: new Date() })
  @IsDateString()
  @IsOptional()
  batchDate?: Date;

  @ApiPropertyOptional({ example: new Date() })
  @IsDateString()
  @IsOptional()
  completionDate?: Date;

  @ApiPropertyOptional({ example: 11 })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  merchantSettlementCurrency?: number;

  @ApiPropertyOptional({ example: 100 })
  @IsNumber()
  @IsOptional()
  totalFiatAmount?: number;

  @ApiPropertyOptional({ example: 100 })
  @IsNumber()
  @IsOptional()
  totalSettlementAmount?: number;

  @ApiPropertyOptional({ example: 100 })
  @IsNumber()
  @IsOptional()
  totalProcessingFee?: number;
}
