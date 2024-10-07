import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RateCompareDto {
  @ApiProperty({ example: 'BTC/USD' })
  @IsString()
  @IsNotEmpty()
  pair: string;
}
