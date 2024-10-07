import { IsNotEmpty, IsString, IsOptional, IsObject, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserBaseInfo } from '../../../helpers';
import { InitiatorTypeEnum } from '../../transaction';

export class VaultRefreshBalanceDto {
  @Type(() => UserBaseInfo)
  @IsObject()
  @ValidateNested()
  initiator: UserBaseInfo<InitiatorTypeEnum.ADMIN>;

  @ApiPropertyOptional({ example: '1234' })
  @IsString()
  @IsOptional()
  vaultAccount?: string;

  @ApiProperty({ example: 'BTC_TEST' })
  @IsNotEmpty()
  @IsString()
  assetId: string;
}
