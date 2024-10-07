import { IsNotEmpty, IsString } from 'class-validator';
import { FireblocksEventsEnum, TransactionDetailDto } from '../../../integrations/fireblocks';

export class WebhookBody {
  @IsString()
  @IsNotEmpty()
  type: FireblocksEventsEnum;

  @IsString()
  @IsNotEmpty()
  tenantId: string; // Unique id of your Fireblocks' workspace

  @IsString()
  @IsNotEmpty()
  timestamp: number; // Timestamp in milliseconds

  @IsNotEmpty()
  data: TransactionDetailDto;
}
