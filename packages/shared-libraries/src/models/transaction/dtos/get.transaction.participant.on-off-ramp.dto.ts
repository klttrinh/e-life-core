import { IsNumber, IsOptional } from 'class-validator';

export class GetTransactionParticipantOnOffRampDto {
  @IsOptional()
  @IsNumber()
  merchantId?: number;

  @IsOptional()
  @IsNumber()
  merchantUserId?: number;
}
