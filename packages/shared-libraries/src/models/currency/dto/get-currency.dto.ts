import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetCurrencyDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name?: string;
}
