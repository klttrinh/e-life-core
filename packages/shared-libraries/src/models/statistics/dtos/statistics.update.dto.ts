import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { StatisticsGetAllDto } from './statistics.get.all.dto';

export class StatisticsUpdateDto extends StatisticsGetAllDto {
  @Type(() => Number)
  @IsNumber()
  id: number;
}
