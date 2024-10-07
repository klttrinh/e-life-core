import { IsOptional, IsDateString, IsEnum, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProductEnum } from '../../product';

export class TransactionGetStatisticsDto {
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsEnum(ProductEnum)
  @IsNotEmpty()
  product: ProductEnum;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  hidden?: boolean;
}
