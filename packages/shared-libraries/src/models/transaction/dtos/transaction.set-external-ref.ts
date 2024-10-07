import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { type TransactionExternalReference, type TransactionLookupId } from '../types';

export class TransactionSetExternalRefDto {
  @IsString()
  @IsNotEmpty()
  transactionId: TransactionLookupId;

  @IsNumber()
  @IsNotEmpty()
  merchantId: number;

  @IsString()
  @IsNotEmpty()
  externalRef: TransactionExternalReference;
}
