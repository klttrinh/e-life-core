import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { ProductEnum } from '../../product/enums/productEnum';
import { CryptoEnum } from '../../currency/enums/crypto.enum';

export class TransactionHaltCoinDto {
  @ApiProperty({ example: ProductEnum.PAYMENT_GATEWAY })
  @IsEnum(ProductEnum)
  @IsNotEmpty()
  product: ProductEnum;

  @ApiProperty({ example: CryptoEnum.BTC })
  @IsEnum(CryptoEnum)
  @IsNotEmpty()
  currencyCode: CryptoEnum;
}
