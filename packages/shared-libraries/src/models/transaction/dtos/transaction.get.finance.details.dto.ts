import { IsOptional, IsNumber, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class TransactionGetFinanceDetailsDto {
  @ApiPropertyOptional({ example: new Date().toISOString() })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({ example: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000).toISOString() })
  @IsOptional()
  @IsDateString()
  startDate?: string;
}
