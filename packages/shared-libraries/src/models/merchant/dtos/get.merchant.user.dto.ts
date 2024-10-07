import { IsNumber } from 'class-validator';

export class GetMerchantUserDto {
  @IsNumber()
  merchantUserId: number;
}
