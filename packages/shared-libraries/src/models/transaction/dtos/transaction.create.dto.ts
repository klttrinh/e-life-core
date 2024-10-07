import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BlockchainEnum } from '../../currency';
import { ProductEnum } from '../../product';
import { type TransactionAmount, type TransactionExternalReference } from '../types';
import { TransactionTypeEnum } from '../enums/transaction.type.enum';
import { AllCurrenciesEnum } from '../../currency/enums/all.currency.enum';
import { BookingCurrencyEnum } from '../enums/booking.currency.enum';
import { UserBaseInfo } from '../../../helpers';
import { UserTypeEnum } from '../enums/user.type.enum';

export class TransactionCreateDto {
  @Type(() => UserBaseInfo)
  @IsNotEmpty()
  sender: UserBaseInfo<UserTypeEnum>;

  @Type(() => UserBaseInfo)
  @IsNotEmpty()
  receiver: UserBaseInfo<UserTypeEnum>;

  @IsNotEmpty()
  @IsEnum(AllCurrenciesEnum)
  toCurrency: AllCurrenciesEnum; // the currency user is expecting to receive in

  @IsNotEmpty()
  @IsEnum(AllCurrenciesEnum)
  fromCurrency: AllCurrenciesEnum; // the currency merchant is offering

  @IsNumber()
  @IsOptional()
  amount?: TransactionAmount;

  @IsNumber()
  @IsOptional()
  cryptoAmount?: TransactionAmount;

  @IsNotEmpty()
  @IsEnum(ProductEnum)
  product: ProductEnum;

  @IsNumber()
  @IsOptional()
  fee?: number;

  @IsNotEmpty()
  @IsEnum(TransactionTypeEnum)
  type: TransactionTypeEnum;

  @Type(() => UserBaseInfo)
  @IsObject()
  @ValidateNested()
  initiator: UserBaseInfo;

  @IsBoolean()
  @IsNotEmpty()
  amountUpdateEnabled: boolean;

  @IsBoolean()
  @IsNotEmpty()
  walletDeclarationRequired: boolean;

  @IsBoolean()
  @IsNotEmpty()
  webhookNotificationEnabled: boolean;

  @IsString()
  @IsOptional()
  externalReference?: TransactionExternalReference; // id of the transaction in the merchant's database

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  merchantSettlementCurrencyId?: number;

  @IsEnum(BookingCurrencyEnum)
  @IsOptional()
  externalBookingCurrency: BookingCurrencyEnum;

  @IsNumber()
  @IsOptional()
  settlementSpread: number;

  @IsString()
  @IsOptional()
  walletAddress?: string;

  @IsString()
  @IsOptional()
  tag?: string;

  @IsEnum(BlockchainEnum)
  @IsOptional()
  fromCurrencyBlockchain?: BlockchainEnum;

  @IsEnum(BlockchainEnum)
  @IsOptional()
  toCurrencyBlockchain?: BlockchainEnum;

  @IsOptional()
  @IsBoolean()
  onrEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  availablePaymentMethodsEnabled?: boolean;

  @IsOptional()
  @IsInt()
  variable1?: number;

  @IsOptional()
  @IsString()
  country?: string;

  @IsObject()
  initialPayload: object;

  @IsOptional()
  @IsUrl({ require_protocol: true, protocols: ['http', 'https'] })
  successUrl?: string;

  @IsOptional()
  @IsUrl({ require_protocol: true, protocols: ['http', 'https'] })
  failureUrl?: string;
}
