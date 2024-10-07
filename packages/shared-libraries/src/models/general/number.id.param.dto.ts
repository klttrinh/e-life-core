import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class NumberIdParamDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  id: number;
}
