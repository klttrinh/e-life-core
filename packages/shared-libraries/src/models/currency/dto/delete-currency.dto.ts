import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DeleteCurrencyDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name?: string;
}
