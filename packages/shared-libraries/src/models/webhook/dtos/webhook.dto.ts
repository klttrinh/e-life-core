import { IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { WebhookBody } from './webhook-body.dto';
import { ProductEnum } from '../../product';

export class WebhookDto {
  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  @IsNotEmpty()
  product: ProductEnum;

  @IsObject()
  @IsNotEmpty()
  headers: Record<string, unknown>;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  body: WebhookBody;
}
