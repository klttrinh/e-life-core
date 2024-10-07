import { IsString, IsArray, IsBoolean, IsOptional } from 'class-validator';

export class RateGetMultiDto {
  @IsArray()
  @IsString({ each: true })
  pairs: string[];

  @IsBoolean()
  withDetails: boolean;

  @IsBoolean()
  @IsOptional()
  allowStaled?: boolean;
}
