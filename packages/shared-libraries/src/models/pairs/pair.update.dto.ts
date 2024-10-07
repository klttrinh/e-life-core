import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { IPairTTL } from '../../interfaces/pair';
import { RateSourceEnum } from '../../interfaces/rate';

export class PairUpdateDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiPropertyOptional({ example: 'ETH/USD' })
  @IsString()
  @IsOptional()
  pair?: string;

  @ApiPropertyOptional({ example: { [RateSourceEnum.BINANCE]: 86400 } })
  @IsObject()
  @IsOptional()
  ttl?: IPairTTL;

  @ApiPropertyOptional({ example: 20 })
  @IsNumber()
  @IsOptional()
  ohlcTolerance_1m?: number;

  @ApiPropertyOptional({ example: 20 })
  @IsNumber()
  @IsOptional()
  ohlcTolerance_5m?: number;

  @ApiPropertyOptional({ example: 20 })
  @IsNumber()
  @IsOptional()
  ohlcTolerance_24h?: number;
}
