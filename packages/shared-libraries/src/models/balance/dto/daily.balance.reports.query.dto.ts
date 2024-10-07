import { IsDateString, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaginationQueryDto } from '../../general/dtos/pagination.query.dto';

export class DailyBalanceReportsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  merchantId?: number;

  @ApiPropertyOptional({ example: 11 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  settlementCurrencyId?: number;

  @ApiPropertyOptional({ example: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000).toISOString() })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).toISOString() })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
