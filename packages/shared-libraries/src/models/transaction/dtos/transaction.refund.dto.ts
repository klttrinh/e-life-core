import { ApiProperty } from '@nestjs/swagger';
import { IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TransactionRefundClientDto } from './transaction.refund.client.dto';
import { UserBaseInfo } from '../../../helpers';
import { InitiatorTypeEnum } from '../enums/initiator-type.enum';

export class TransactionRefundDto extends TransactionRefundClientDto {
  @Type(() => UserBaseInfo)
  @ApiProperty()
  @IsObject()
  @ValidateNested()
  initiator: UserBaseInfo<InitiatorTypeEnum.ADMIN>;
}
