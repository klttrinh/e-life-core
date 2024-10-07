import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class TransactionResetWithdrawalBalancesDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  ids?: number[];
}
