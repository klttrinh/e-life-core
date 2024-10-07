import { IsNotEmpty, IsEnum, IsNumber, IsOptional, IsString, IsBoolean, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { type TransactionId, type TransactionLookupId } from '../types';
import { ProductEnum } from '../../product';
import { TransactionStatusEnum } from '../enums/transasction.status.enum';
import { TransactionTypeEnum } from '../enums/transaction.type.enum';

export class GetTransactionDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id?: TransactionId;

  @IsOptional()
  @IsString()
  transactionId?: TransactionLookupId;

  @IsOptional()
  @IsNumber()
  toUserId?: number;

  @IsOptional()
  @IsString()
  toUserType?: string;

  @IsOptional()
  @IsNumber()
  fromUserId?: number;

  @IsOptional()
  @IsString()
  fromUserType?: string;

  @IsOptional()
  @IsNumber()
  merchantId?: number;

  @IsNotEmpty()
  @IsEnum(ProductEnum)
  product: ProductEnum;

  @IsBoolean()
  @IsOptional()
  withArchived?: boolean;

  @IsOptional()
  @IsArray()
  @IsEnum(TransactionStatusEnum, { each: true })
  status?: TransactionStatusEnum[];

  @IsOptional()
  @IsArray()
  @IsEnum(TransactionTypeEnum, { each: true })
  type?: TransactionTypeEnum[];

  @IsOptional()
  @IsNumber()
  operatorId?: number;

  @IsOptional()
  @IsArray()
  merchantIds?: number[];
}
