import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CurrencyDto {
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
  @IsString()
  blockchain: string;

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
}
