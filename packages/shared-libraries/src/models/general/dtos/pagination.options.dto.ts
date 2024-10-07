import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { OrderEnum } from '../enums/order.enum';

export class PaginationOptionsDto {
  @ApiProperty({ example: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  start: number;

  @ApiProperty({ example: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  end: number;

  @ApiProperty({ example: OrderEnum.DESC, enum: OrderEnum })
  @IsOptional()
  @IsEnum(OrderEnum)
  order?: OrderEnum;

  @ApiProperty({ example: 'id' })
  @IsOptional()
  @IsString()
  sort?: string;
}
