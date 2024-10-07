import { IsOptional, IsEnum, IsNotEmpty, IsArray, IsBoolean } from 'class-validator';
import { ProductEnum } from '../../product';

export class TransactionGetMerchantUsersStatisticsDto {
  @IsOptional()
  @IsArray()
  fromUserIds?: number[];

  @IsEnum(ProductEnum)
  @IsNotEmpty()
  product: ProductEnum;

  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;
}
