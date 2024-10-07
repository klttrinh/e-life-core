import { IsOptional, IsEnum, IsNotEmpty, IsArray } from 'class-validator';
import { ProductEnum } from '../../product';

export class TransactionGetMerchantsStatisticsDto {
  @IsOptional()
  @IsArray()
  toUserIds?: number[];

  @IsEnum(ProductEnum)
  @IsNotEmpty()
  product: ProductEnum;
}
