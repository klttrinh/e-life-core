import { IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { TransactionLogEventEnum } from '../enums/transaction.log.event.enum';
import { TransactionStatusEnum } from '../enums/transasction.status.enum';
import { UserTypeEnum } from '../enums/user.type.enum';

export class TransactionCreateLogDto {
  @IsEnum(TransactionLogEventEnum)
  event: TransactionLogEventEnum;

  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  initiatorId?: number;

  @IsOptional()
  @IsEnum(UserTypeEnum)
  initiatorType?: UserTypeEnum;

  @IsOptional()
  @IsString()
  initiatorName?: string;

  @IsString()
  transactionLookupId: string;

  @IsOptional()
  @IsEnum(TransactionStatusEnum)
  transactionStatus?: TransactionStatusEnum;

  @IsOptional()
  @IsObject()
  extraData?: object;
}
