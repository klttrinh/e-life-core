import { IsNumber, IsOptional, IsEnum, IsString, IsDate } from 'class-validator';
import { KycTypeEnum } from '../enums/kyc-type.enum';
import { ProviderTypeEnum } from '../enums/provider-type.enum';
import { KycStatusEnum } from '../enums/kyc-status.enum';

export class CreateKycDto {
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @IsOptional()
  @IsEnum(KycTypeEnum)
  type?: KycTypeEnum;

  @IsOptional()
  @IsEnum(ProviderTypeEnum)
  provider_type?: ProviderTypeEnum;

  @IsOptional()
  @IsEnum(KycStatusEnum)
  status?: KycStatusEnum;

  @IsOptional()
  @IsString()
  provider_ref?: string;

  @IsOptional()
  @IsDate()
  date_of_issuance?: string;

  @IsOptional()
  @IsDate()
  expires_at?: string;
}
