/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsObject, IsString } from 'class-validator';
import { AssetStatusEnum } from '../enums/asset-status.enum';
import { CryptoEnum } from '../../currency';
import { type IRate } from '../../../interfaces/rate';

class Currency {
  @ApiProperty({ enum: AssetStatusEnum, example: AssetStatusEnum.DISABLED })
  @IsEnum(AssetStatusEnum)
  status: AssetStatusEnum;

  @ApiProperty({ enum: CryptoEnum, example: CryptoEnum.BTC })
  @IsEnum(CryptoEnum)
  code: CryptoEnum;

  @ApiProperty()
  rate: IRate;
}

export class AssetUpdateStatusDto {
  @ApiProperty({ isArray: true })
  @IsArray()
  currencies: Currency[];

  @ApiProperty()
  @IsObject()
  reason: {
    data: object;
    causedBy: string;
    threshold: number;
  };
}
