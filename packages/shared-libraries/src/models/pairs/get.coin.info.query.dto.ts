import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetCoinInfoQueryDto {
  @ApiProperty({ example: 'USD' })
  @IsString()
  @IsNotEmpty()
  coin: string;
}
