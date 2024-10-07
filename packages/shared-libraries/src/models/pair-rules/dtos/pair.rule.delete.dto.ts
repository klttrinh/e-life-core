import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PairRuleDeleteDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;
}
