import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { IntersectionType } from '@nestjs/swagger';
import { ProductEnum } from '../../product';
import { TransactionStatusEnum } from '../enums/transasction.status.enum';
import { PaginationQueryDto } from '../../general/dtos/pagination.query.dto';
import { AllCurrenciesEnum } from '../../currency';
import { TransactionTypeEnum } from '../enums/transaction.type.enum';
import { AmlStatusEnum } from '../enums/aml.status.enum';
import { CreditOrderStatusEnum } from '../enums/transaction.credit.order.status.enum';
import { PaymentProviderEnum } from '../../vault';
import { FireblocksTransactionStatusEnum } from '../../../integrations/fireblocks/src/fireblocks-sdk';
import { OnOffRampStatusesEnum } from '../../../integrations/on-off-ramp/enums/on-off-ramp-statuses.enum';
import { AmlStatusReasonEnum } from '../enums/aml.status.reason.enum';
import { StatusReasonEnum } from '../enums/status-reason.enum';
import { FilterByOperandQueryDto } from '../../general';

export class GetTransactionsDto extends IntersectionType(PaginationQueryDto, FilterByOperandQueryDto) {
  @IsNotEmpty()
  @IsEnum(ProductEnum)
  product: ProductEnum;

  @IsBoolean()
  @IsOptional()
  hidden?: boolean;

  @IsBoolean()
  @IsOptional()
  withArchived?: boolean;

  @IsBoolean()
  @IsOptional()
  archived?: boolean;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  toUserType?: string;

  @IsOptional()
  @IsString()
  fromUserType?: string;

  @IsOptional()
  @IsString()
  searchDate?: Date;

  @IsOptional()
  @IsString()
  transactionId?: string;

  @IsOptional()
  @IsString()
  walletAddress?: string;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split('&');
    }
    // eslint-disable-next-line max-len
    return value; // the filed is coming from query so is string, the second check is this function is being called twice so the second time it's boolean
  })
  @IsString({ each: true })
  status?: Array<keyof typeof TransactionStatusEnum>;

  @IsOptional()
  @IsBoolean()
  noMatch?: boolean;

  @IsOptional()
  @IsEnum({ ...FireblocksTransactionStatusEnum, ...OnOffRampStatusesEnum })
  providerStatus?: FireblocksTransactionStatusEnum | OnOffRampStatusesEnum;

  @IsOptional()
  @IsString()
  providerReference?: string;

  @IsOptional()
  @IsEnum(PaymentProviderEnum)
  paymentProvider?: PaymentProviderEnum;

  @IsOptional()
  @IsString()
  transactionHash?: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  fromUserIds?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  toUserIds?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  merchantIds?: number[];

  @IsOptional()
  @IsNumber()
  merchantId?: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  merchantUserIds?: number[];

  @IsOptional()
  @IsNumber()
  merchantUserId?: number;

  @IsOptional()
  @IsNumber()
  replacedTransactionId?: number;

  @IsOptional()
  exportType?: string;

  @IsOptional()
  @IsNumber()
  batchId?: number;

  @IsOptional()
  @IsEnum(AllCurrenciesEnum)
  toCurrencyCode?: AllCurrenciesEnum;

  @IsOptional()
  @IsEnum(AllCurrenciesEnum)
  fromCurrencyCode?: AllCurrenciesEnum;

  @IsOptional()
  @IsArray()
  @Transform(({ value, key }) => {
    const list = Array.isArray(value) ? value.map(Number) : [Number(value)];

    if (list.some(Number.isNaN)) {
      throw new BadRequestException(`${key} must contain array of valid numbers`);
    }
    return list;
  })
  toCurrencyId?: Array<number>;

  @IsOptional()
  @IsArray()
  @Transform(({ value, key }) => {
    const list = Array.isArray(value) ? value.map(Number) : [Number(value)];

    if (list.some(Number.isNaN)) {
      throw new BadRequestException(`${key} must contain array of valid numbers`);
    }
    return list;
  })
  fromCurrencyId?: Array<number>;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split('&');
    }
    // eslint-disable-next-line max-len
    return value; // the filed is coming from query so is string, the second check is this function is being called twice so the second time it's boolean
  })
  @IsString({ each: true })
  transactionType?: Array<keyof typeof TransactionTypeEnum>;

  @IsOptional()
  @IsEnum(AmlStatusEnum)
  amlStatus?: AmlStatusEnum;

  @IsOptional()
  @IsEnum(AmlStatusReasonEnum)
  amlStatusReason?: AmlStatusReasonEnum;

  @IsOptional()
  @IsEnum(StatusReasonEnum)
  statusReason?: StatusReasonEnum;

  @IsBoolean()
  @IsOptional()
  isAlerted?: string;

  @IsOptional()
  @IsNumber()
  refundedTransactionId?: number;

  @IsOptional()
  @IsEnum(CreditOrderStatusEnum)
  creditOrderStatus?: CreditOrderStatusEnum;

  @IsOptional()
  @IsString()
  tag?: string;
}
