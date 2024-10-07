import { IsNotEmpty, IsString, IsOptional, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductEnum } from '../../product';
import { UserBaseInfo } from '../../../helpers';
import { UserTypeEnum } from '../enums/user.type.enum';
import { AllCurrenciesEnum } from '../../currency/enums/all.currency.enum';
import { BlockchainEnum } from '../../currency/enums/blockchain.enum';

export class GenerateBalanceDepositWalletDto {
  @Type(() => UserBaseInfo)
  @IsNotEmpty()
  @ValidateNested()
  sender?: UserBaseInfo<UserTypeEnum>;

  @Type(() => UserBaseInfo)
  @IsNotEmpty()
  @ValidateNested()
  receiver?: UserBaseInfo<UserTypeEnum>;

  @IsString()
  @IsNotEmpty()
  product: ProductEnum;

  @IsEnum(AllCurrenciesEnum)
  @IsNotEmpty()
  asset: AllCurrenciesEnum;

  @IsEnum(BlockchainEnum)
  @IsOptional()
  blockchain?: BlockchainEnum;
}
