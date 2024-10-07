import { IsNumber, IsEnum, IsOptional, IsString } from 'class-validator';
import { AddressTypeEnum } from '../enums/address-type.enum';

export class CreateAddressDto {
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @IsOptional()
  @IsEnum(AddressTypeEnum)
  type?: AddressTypeEnum;

  @IsOptional()
  @IsNumber()
  country_id?: number;

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
  house_number?: string;

  @IsOptional()
  @IsNumber()
  zip_code?: number;
}
