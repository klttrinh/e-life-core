import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsObject,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Type } from 'class-transformer';
import { type TransactionHash, type TransactionId } from '../types';
import { PaymentProviderEnum } from '../../vault';
import { UserTypeEnum } from '../enums/user.type.enum';
import { ProductEnum } from '../../product';
import { TransactionStatusUpdateByAdminEnum } from '../enums/transaction.status.update.by.admin.enum';
import { UserBaseInfo } from '../../../helpers';
import { FireblocksTransactionStatusEnum } from '../../../integrations/fireblocks/src/fireblocks-sdk';
import { OnOffRampStatusesEnum } from '../../../integrations/on-off-ramp/enums/on-off-ramp-statuses.enum';

export class TransactionAdminUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  id: TransactionId;

  @ApiPropertyOptional({ example: randomUUID() })
  @IsString()
  @IsOptional()
  transactionHash?: TransactionHash;

  @ApiPropertyOptional({
    enum: TransactionStatusUpdateByAdminEnum,
    example: TransactionStatusUpdateByAdminEnum.COMPLETED,
  })
  @IsEnum(TransactionStatusUpdateByAdminEnum)
  @IsOptional()
  status?: TransactionStatusUpdateByAdminEnum;

  @ApiPropertyOptional({ example: randomUUID() })
  @IsString()
  @IsOptional()
  toWalletAddress?: string;

  @ApiPropertyOptional({ example: randomUUID() })
  @IsString()
  @IsOptional()
  providerReference?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  fromCurrencyId?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsNumber()
  @IsOptional()
  estimatedNetworkFee?: number;

  @ApiPropertyOptional({ enum: PaymentProviderEnum, example: PaymentProviderEnum.NEXO })
  @IsEnum(PaymentProviderEnum)
  @IsOptional()
  provider?: PaymentProviderEnum;

  @ApiPropertyOptional({
    enum: { ...FireblocksTransactionStatusEnum, ...OnOffRampStatusesEnum },
    example: FireblocksTransactionStatusEnum.COMPLETED,
  })
  @IsOptional()
  @IsEnum({ ...FireblocksTransactionStatusEnum, ...OnOffRampStatusesEnum })
  providerStatus?: FireblocksTransactionStatusEnum | OnOffRampStatusesEnum;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  toCurrencyId?: number;

  @Type(() => UserBaseInfo)
  @ApiProperty()
  @IsObject()
  @ValidateNested()
  initiator: UserBaseInfo;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  fiatCurrencyId?: number;

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  cryptoCurrencyId?: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  hidden?: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  toUserId?: number;

  @ApiPropertyOptional({ enum: UserTypeEnum, example: UserTypeEnum.MERCHANT })
  @IsOptional()
  @IsEnum(UserTypeEnum)
  toUserType?: UserTypeEnum;

  @ApiProperty({ enum: ProductEnum, example: ProductEnum.PAYMENT_GATEWAY })
  @IsNotEmpty()
  @IsEnum(ProductEnum)
  product: ProductEnum;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  sendWebhooks?: boolean;
}
