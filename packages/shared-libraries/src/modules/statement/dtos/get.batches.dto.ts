import { IsDateString, IsOptional, IsNumber, IsEnum, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { StatementTypeEnum } from '../../../models/transaction-batch/enums/statement-type.enum';
import { PaginationQueryDto } from '../../../models/general/dtos/pagination.query.dto';
import { AllCurrenciesEnum } from '../../../models/currency/enums/all.currency.enum';

export class GetBatchesDto extends PaginationQueryDto {
  @ApiPropertyOptional({ example: new Date().toISOString() })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({ example: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000).toISOString() })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  merchantId?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  settlementId?: number;

  @ApiPropertyOptional({ example: [StatementTypeEnum.BATCH], enum: StatementTypeEnum, isArray: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      // If the value is empty, then return undefined to ignore the field
      if (value.trim() === '') {
        return undefined;
      }
      // Allow this format too: BATCH&PAYOUT&...
      return value.split('&');
    }
    return value;
  })
  @IsArray()
  @IsEnum(StatementTypeEnum, { each: true })
  statementType?: StatementTypeEnum[];

  @ApiPropertyOptional({ example: 11 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  merchantSettlementCurrency?: number;
}
