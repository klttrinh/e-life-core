import { IsNotEmpty, IsNumber, IsNumberString, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserBaseInfo } from '../../../helpers';
import { InitiatorTypeEnum } from '../enums/initiator-type.enum';

export class TransactionCreateMiscellaneousDto {
  @Type(() => String)
  @IsNumberString()
  @IsNotEmpty()
  amount: string;

  @IsString()
  description: string;

  @Type(() => String)
  @IsNumberString()
  @IsNotEmpty()
  fee: string;

  @Type(() => UserBaseInfo)
  @IsObject()
  @ValidateNested()
  initiator: UserBaseInfo<InitiatorTypeEnum.ADMIN>;

  @IsNumber()
  merchantId: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  currencyId: number;
}
