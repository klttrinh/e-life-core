import { IsEnum, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CurrencyStatusEnum } from '../enums/currency-status.enum';
import { NumberOfConfirmationsDto } from './number-of-confirmations.dto';

export class CreateCurrencyDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  currencyType: string;

  @IsOptional()
  @IsString()
  currencyCode: string;

  @IsOptional()
  @IsString()
  fireblocksRef: string;

  @IsOptional()
  @IsString()
  network: string;

  @IsOptional()
  @IsString()
  protocol: string;

  @IsOptional()
  @IsEnum(CurrencyStatusEnum)
  status?: CurrencyStatusEnum;

  @IsOptional()
  @IsString()
  symbol: string;

  @IsOptional()
  @IsNumber()
  precision: number;

  @IsOptional()
  @IsNumber()
  scale: number;

  @IsOptional()
  @IsNumber()
  minimumAmount?: number;

  @IsObject()
  @ValidateNested()
  @Type(() => NumberOfConfirmationsDto)
  numberOfConfirmations: NumberOfConfirmationsDto;
}
