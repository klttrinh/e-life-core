/* eslint-disable max-len */
// eslint-disable-next-line max-classes-per-file
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { QueryOperatorEnum } from '../enums/query.operator.enum';

class FilterByOpDto {
  @ApiProperty({
    enum: QueryOperatorEnum,
    example: QueryOperatorEnum.IN,
  })
  @IsNotEmpty()
  @IsEnum(QueryOperatorEnum)
  op: QueryOperatorEnum;

  @ApiProperty({ example: 'transaction_type' })
  @IsNotEmpty()
  @IsString()
  field: string;

  @ApiProperty({ example: '[DEPOSIT&WITHDRAWAL]' })
  @IsNotEmpty()
  @IsString()
  value: string;
}
export class FilterByOperandQueryDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilterByOpDto)
  @IsOptional()
  filterByOps?: FilterByOpDto[];
}
