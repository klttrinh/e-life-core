import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetPairInfoDto {
  @ApiPropertyOptional({ example: 'EUR/BTC' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  pair?: string;
}
