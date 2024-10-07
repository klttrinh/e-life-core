import { IsArray, IsOptional } from 'class-validator';

export class FindQueryDto<T> {
  @IsArray()
  @IsOptional()
  attributes?: (keyof T)[];
}
