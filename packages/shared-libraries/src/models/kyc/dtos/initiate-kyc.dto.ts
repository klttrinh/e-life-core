import { IsNumber, IsString } from 'class-validator';
import { KycUserTypeEnum } from '../enums/kyc-user-type.enum';

export class InitiateKycDto {
  @IsNumber()
  userId: number;

  @IsString()
  userType: KycUserTypeEnum;
}
