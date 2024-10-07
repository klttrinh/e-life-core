import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserBaseInfo } from '../../../helpers';
import { InitiatorTypeEnum } from '../enums/initiator-type.enum';

export class TransactionFreezeDto {
  @Type(() => UserBaseInfo)
  @ApiProperty()
  @IsObject()
  @ValidateNested()
  initiator: UserBaseInfo<InitiatorTypeEnum.ADMIN>;

  @ApiProperty({ example: 1 })
  @IsNumber()
  transactionId: number;
}
