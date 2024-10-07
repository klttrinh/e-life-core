import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetTransactionParticipantsDto {
  @IsNumber()
  merchantId: number;

  @IsOptional()
  @IsString()
  userRef?: string;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsString()
  dateOfBirth: string;

  @IsString()
  fullName: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  zipCode?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  addressTwo?: string;

  @IsString()
  @IsOptional()
  addressNumber?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneCode?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsBoolean()
  internalUser?: boolean;
}
