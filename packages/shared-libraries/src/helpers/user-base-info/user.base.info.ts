import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InitiatorTypeEnum } from '../../models/transaction/enums/initiator-type.enum';
import { UserTypeEnum } from '../../models';

export class UserBaseInfo<Type extends UserTypeEnum | InitiatorTypeEnum = InitiatorTypeEnum> {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'a good initiator guy' })
  @IsString()
  name: string;

  @ApiProperty({ enum: InitiatorTypeEnum, example: InitiatorTypeEnum.ADMIN })
  @IsEnum(InitiatorTypeEnum)
  type: Type;

  @ApiProperty({ example: [1, 2] })
  @IsNumber({}, { each: true })
  @IsOptional()
  merchantIds?: number[];
}
