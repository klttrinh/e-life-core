import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { type CurrencyId } from '../../currency';
import { type TransactionLookupId } from '../types';

export class TransactionClientUpdateDto {
  @IsString()
  @IsNotEmpty()
  id: TransactionLookupId;

  @IsNumber()
  @IsOptional()
  cryptoCurrencyId?: CurrencyId;

  @IsNumber()
  @IsOptional()
  amount?: number;
}
