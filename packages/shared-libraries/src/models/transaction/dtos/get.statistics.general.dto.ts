import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';
import { ProductEnum } from '../../product';
import { TransactionTypeEnum } from '../enums/transaction.type.enum';

export class GetStatisticsGeneralDto {
  @IsString()
  @IsNotEmpty()
  product: ProductEnum;

  @IsNumber()
  @IsOptional()
  merchantId?: number;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsEnum(TransactionTypeEnum)
  @IsOptional()
  transactionType?: TransactionTypeEnum;
}
