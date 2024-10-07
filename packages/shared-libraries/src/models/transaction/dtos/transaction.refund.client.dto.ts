import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class TransactionRefundClientDto {
  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  cryptoWalletId?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  transactionId: number;
}
