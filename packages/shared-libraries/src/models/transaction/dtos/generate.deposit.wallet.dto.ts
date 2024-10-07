import { IsNotEmpty, IsString, IsOptional, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductEnum } from '../../product';
import { type TransactionId } from '../types';
import { UserBaseInfo } from '../../../helpers';
import { UserTypeEnum } from '../enums/user.type.enum';

export class GenerateDepositWalletDto {
  @IsString()
  @IsNotEmpty()
  transactionId: TransactionId;

  @Type(() => UserBaseInfo)
  @IsNotEmpty()
  @IsOptional()
  @ValidateNested()
  sender?: UserBaseInfo<UserTypeEnum>;

  @Type(() => UserBaseInfo)
  @IsNotEmpty()
  @IsOptional()
  @ValidateNested()
  receiver?: UserBaseInfo<UserTypeEnum>;

  @IsOptional()
  @IsNumber()
  currencyId?: number;

  @IsString()
  @IsNotEmpty()
  product: ProductEnum;
}
