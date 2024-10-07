import { IsEnum, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { type TransactionId } from '../types';
import { ProductEnum } from '../../product';
import { UserBaseInfo } from '../../../helpers';

export class TransactionAdminBookOrRejectDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  id: TransactionId;

  @Type(() => UserBaseInfo)
  @ApiProperty()
  @IsObject()
  @ValidateNested()
  initiator: UserBaseInfo;

  @ApiProperty({ enum: ProductEnum, example: ProductEnum.PAYMENT_GATEWAY })
  @IsNotEmpty()
  @IsEnum(ProductEnum)
  product: ProductEnum;
}
