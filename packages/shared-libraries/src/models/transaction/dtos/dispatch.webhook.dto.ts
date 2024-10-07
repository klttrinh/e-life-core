import { IsNumber, IsString, IsBoolean, IsJSON, IsOptional, IsNotEmpty } from 'class-validator';
import { ProductEnum } from '../../product';
import { PaymentProviderEnum } from '../../vault';
import {
  type TransactionExternalReference,
  type TransactionHash,
  type TransactionId,
  type TransactionLookupId,
} from '../types';
import { TransactionTypeEnum } from '../enums/transaction.type.enum';
import { TransactionStatusEnum } from '../enums/transasction.status.enum';
import { OnOffRampStatusesEnum } from '../../../integrations/on-off-ramp/enums/on-off-ramp-statuses.enum';
import { FireblocksTransactionStatusEnum } from '../../../integrations/fireblocks/src/fireblocks-sdk';

export class DispatchWebhookDto {
  @IsOptional()
  id: TransactionId;

  @IsString()
  product: ProductEnum;

  @IsOptional()
  @IsString()
  paymentProvider: PaymentProviderEnum;

  @IsNumber()
  fromUserId: number;

  @IsString()
  fromUserType: string;

  @IsNumber()
  toUserId: number;

  @IsString()
  toUserType: string;

  @IsOptional()
  @IsNumber()
  fromCurrencyId: number;

  @IsOptional()
  @IsNumber()
  toCurrencyId: number;

  @IsOptional()
  amountFrom: number | string;

  @IsOptional()
  amountTo: number | string;

  @IsOptional()
  rate: number;

  @IsOptional()
  @IsString()
  fromWalletAddress: string;

  @IsOptional()
  @IsString()
  toWalletAddress: string;

  @IsOptional()
  @IsNumber()
  networkFee: number;

  @IsOptional()
  @IsNumber()
  estimatedNetworkFee: number;

  @IsOptional()
  @IsString()
  networkFeeType: string;

  @IsString()
  transactionType: TransactionTypeEnum;

  @IsString()
  status: TransactionStatusEnum;

  @IsOptional()
  @IsString()
  providerStatus: OnOffRampStatusesEnum | FireblocksTransactionStatusEnum;

  @IsOptional()
  @IsString()
  providerReference: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsJSON()
  additionalInfo: object;

  @IsString()
  @IsOptional()
  statusReason: string;

  @IsString()
  @IsOptional()
  transactionHash: TransactionHash;

  @IsNumber()
  @IsOptional()
  numberOfConfirmations: number;

  @IsString()
  externalReference: TransactionExternalReference;

  @IsString()
  lookUpId: TransactionLookupId;

  @IsBoolean()
  amountUpdateEnabled: boolean;

  @IsBoolean()
  webhookNotificationEnabled: boolean;

  @IsNotEmpty()
  createdAt: string;

  @IsNotEmpty()
  updatedAt: string;

  @IsString()
  event: string; // "created"|"updated"
}
