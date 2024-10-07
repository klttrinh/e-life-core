import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  country_id?: number; // TODO(@taha) maybe an enum?

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  house_number?: string; // ex:  24/2-4

  @IsOptional()
  @IsNumber()
  zip_code?: number;
}
