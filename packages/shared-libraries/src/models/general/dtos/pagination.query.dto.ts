import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsEnum, IsNumber, IsObject, IsArray, IsBoolean } from 'class-validator';
import { Includeable } from 'sequelize';
import { OrderEnum } from '../enums/order.enum';

export class PaginationQueryDto {
  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  _start?: number;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  _end?: number;

  @ApiPropertyOptional({ example: OrderEnum.DESC, enum: OrderEnum })
  @IsOptional()
  @IsEnum(OrderEnum)
  _order?: OrderEnum;

  @ApiPropertyOptional({ example: 'id' })
  @IsOptional()
  @IsString()
  _sort?: string;
}
