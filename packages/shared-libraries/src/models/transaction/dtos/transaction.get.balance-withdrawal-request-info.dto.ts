import { IsNumber, IsOptional, IsString } from 'class-validator';
import { type TransactionAmount } from '../types';

export class GetBalanceWithdrawalRequestInfoDto {
  @IsNumber()
  merchantId: number;

  @IsNumber()
  processingFee: number;

  @IsNumber()
  currencyId: number;

  @IsString()
  @IsOptional()
  walletAddress?: string;

  @IsNumber()
  amount: TransactionAmount;
}
