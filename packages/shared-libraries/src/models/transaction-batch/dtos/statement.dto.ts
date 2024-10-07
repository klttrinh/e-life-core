import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { FiatEnum } from '../../currency/enums/fiat.enum';
import { StatementTypeEnum } from '../enums/statement-type.enum';
import { AllCurrenciesEnum } from '../../currency';

export class StatementDto {
  @ApiPropertyOptional({ example: 2 })
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

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  merchantId?: number;

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

  @ApiPropertyOptional({ example: new Date() })
  @IsDateString()
  @IsOptional()
  createdAt?: Date;

  @ApiPropertyOptional({ example: new Date() })
  @IsDateString()
  @IsOptional()
  updatedAt?: Date;

  @ApiPropertyOptional({ enum: StatementTypeEnum, example: 'batch' })
  @IsNumber()
  @IsNotEmpty()
  type?: StatementTypeEnum;
}
