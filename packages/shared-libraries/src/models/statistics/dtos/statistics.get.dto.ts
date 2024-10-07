import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class StatisticsGetDto {
  @Type(() => Number)
  @IsNumber()
  id: number;
}
