import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { CryptoEnum } from '../currency';

export class PairUpdateOhlcDto {
  @ApiProperty({ example: 'BTC' })
  @IsEnum(CryptoEnum)
  currency: CryptoEnum;

  @ApiPropertyOptional({ example: 0.2 })
  @IsNumber()
  @IsOptional()
  oneMinuteLimit?: number;

  @ApiPropertyOptional({ example: 0.2 })
  @IsNumber()
  @IsOptional()
  fiveMinuteLimit?: number;

  @ApiPropertyOptional({ example: 0.2 })
  @IsNumber()
  @IsOptional()
  oneDayLimit?: number;
}
