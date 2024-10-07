import { IsNotEmpty, IsNumber, IsString, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CryptoEnum } from '../../currency/enums/crypto.enum';
import { AllCurrenciesEnum, FiatEnum } from '../../currency';

export class CreateTransactionBatchDto {
  @ApiProperty({ example: `PG&1&/&${FiatEnum.EUR}&22/05/02}` })
  @IsString()
  batchNumber: string;

  @ApiProperty({ enum: CryptoEnum, example: new Date() })
  @IsDateString()
  @IsNotEmpty()
  batchDate: string;

  @ApiPropertyOptional({ enum: CryptoEnum, example: new Date() })
  @IsDateString()
  @IsOptional()
  completionDate?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  merchantId: number;

  @ApiProperty({ example: 11 })
  @IsNumber()
  merchantSettlementCurrency: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  totalFiatAmount: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  totalSettlementAmount: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  totalProcessingFee: number;
}
