import { IsString, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class StatisticsGetAllDto {
  @ApiPropertyOptional({ example: 1 })
  @IsString()
  date?: string;

  @ApiPropertyOptional({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  merchantId?: number;

  @ApiPropertyOptional({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  currencyId?: number;

  @ApiPropertyOptional({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  volume?: number;

  @ApiPropertyOptional({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  volumeInEur?: number;

  @ApiPropertyOptional({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  settlementSpreadInEur?: number;

  @ApiPropertyOptional({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  processingFeeInEur?: number;

  @ApiPropertyOptional({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  numberOfTransactions?: number;

  @ApiPropertyOptional({ example: 'DEPOSIT' })
  @IsString()
  transactionType?: string;
}
