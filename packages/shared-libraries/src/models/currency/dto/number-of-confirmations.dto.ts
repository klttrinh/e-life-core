import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export enum NumberOfConfirmationsKeyEnum {
  'LOW' = 'LOW',
  'MEDIUM' = 'MEDIUM',
  'HIGH' = 'HIGH',
  'VERY_LOW' = 'VERY_LOW',
  'MAX_EUR_VERY_LOW_0_CONFIRMATION' = 'MAX_EUR_VERY_LOW_0_CONFIRMATION',
  'MIN_FEE_UNIT' = 'MIN_FEE_UNIT',
}
type Keys = keyof typeof NumberOfConfirmationsKeyEnum;
export type ICoinNumberOfConfirmations = {
  [key in Keys]: number;
};

export class NumberOfConfirmationsDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  [NumberOfConfirmationsKeyEnum.VERY_LOW]: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  [NumberOfConfirmationsKeyEnum.LOW]: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  [NumberOfConfirmationsKeyEnum.MEDIUM]: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  [NumberOfConfirmationsKeyEnum.HIGH]: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  [NumberOfConfirmationsKeyEnum.MAX_EUR_VERY_LOW_0_CONFIRMATION]: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  [NumberOfConfirmationsKeyEnum.MIN_FEE_UNIT]: number;
}
