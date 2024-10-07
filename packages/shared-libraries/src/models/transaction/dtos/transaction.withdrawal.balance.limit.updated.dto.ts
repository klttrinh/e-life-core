import { IsNumber } from 'class-validator';

export class TransactionWithdrawalBalanceLimitUpdatedDto {
  @IsNumber()
  merchantId: number;

  @IsNumber()
  withdrawalBalanceLimit: number;
}
