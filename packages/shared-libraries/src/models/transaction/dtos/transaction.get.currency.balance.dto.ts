import { IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class TransactionGetCurrencyBalanceDto {
  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  merchantId: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  currencyId: number;
}
