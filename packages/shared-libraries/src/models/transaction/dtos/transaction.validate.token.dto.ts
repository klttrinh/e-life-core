import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { type TransactionLookupId } from '../types';

export class TransactionValidateTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  transactionId: TransactionLookupId;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
