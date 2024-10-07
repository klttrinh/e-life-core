import { IsEnum, IsNumber, IsString, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AllCurrenciesEnum } from '../../currency';
import { UserBaseInfo } from '../../../helpers';
import { InitiatorTypeEnum } from '../enums/initiator-type.enum';

export class TransactionCreateRefundDto {
  @ApiProperty({ example: 100 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'Some description' })
  @IsString()
  description: string;

  @ApiProperty({ example: 0.03 })
  @IsNumber()
  fee: number;

  @Type(() => UserBaseInfo)
  @ApiProperty()
  @IsObject()
  @ValidateNested()
  initiator: UserBaseInfo<InitiatorTypeEnum.ADMIN>;

  @ApiProperty({ example: 1 })
  @IsNumber()
  merchantId: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  currency?: number;
}
