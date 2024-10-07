import { IsNumber } from 'class-validator';
import { IMerchant } from '../../../interfaces/merchant';
import { FindQueryDto } from '../../../dtos/find.query.dto';

export class GetMerchantDto extends FindQueryDto<IMerchant> {
  @IsNumber()
  merchantId: number;
}
