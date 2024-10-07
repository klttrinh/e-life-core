import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { type TransactionLookupId } from '../types';

export class TransactionGenerateAccessTokenDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsString()
  transactionId: TransactionLookupId;

  @ApiPropertyOptional({ example: randomUUID() })
  @IsOptional()
  @IsString()
  currentToken?: string; // needed if refreshing token
}
