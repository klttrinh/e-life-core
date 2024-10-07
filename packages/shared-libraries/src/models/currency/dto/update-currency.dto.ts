import { IsEnum, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BlockchainEnum } from '../enums/blockchain.enum';
import { NumberOfConfirmationsDto } from './number-of-confirmations.dto';

export class UpdateCurrencyDto {
  @IsOptional()
  @IsNumber()
  id: number;

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
  @IsEnum(BlockchainEnum)
  blockchain: BlockchainEnum;

  @IsOptional()
  @IsString()
  network: string;

  @IsOptional()
  @IsString()
  protocol: string;

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

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => NumberOfConfirmationsDto)
  numberOfConfirmations?: NumberOfConfirmationsDto;
}
