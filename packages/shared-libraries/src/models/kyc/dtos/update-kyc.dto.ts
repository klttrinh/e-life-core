import { IsNumber, IsOptional, IsEnum, IsString } from 'class-validator';
import { ProviderTypeEnum } from '../enums/provider-type.enum';
import { KycTypeEnum } from '../enums/kyc-type.enum';
import { KycStatusEnum } from '../enums/kyc-status.enum';

export class UpdateKycDto {
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @IsOptional()
  @IsEnum(KycTypeEnum)
  type?: KycTypeEnum;

  @IsOptional()
  @IsEnum(ProviderTypeEnum)
  providerType?: ProviderTypeEnum;

  @IsOptional()
  @IsEnum(KycStatusEnum)
  status?: KycStatusEnum;

  @IsOptional()
  @IsString()
  providerRef?: string;
}
