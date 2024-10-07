import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class StatisticsCreateDto {
  @ApiProperty({ example: 1 })
  @IsString()
  date: string;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  merchantId: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  currencyId: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  volume: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  volumeInEur: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  settlementSpreadInEur: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  processingFeeInEur: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  numberOfTransactions: number;

  @ApiProperty({ example: 'DEPOSIT' })
  @IsString()
  @IsNotEmpty()
  transactionType: string;
}
