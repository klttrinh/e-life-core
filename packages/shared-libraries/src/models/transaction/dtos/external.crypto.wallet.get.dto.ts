import { IsString, IsOptional, IsEnum, IsNumber, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserTypeEnum } from '../enums/user.type.enum';
import { CryptoEnum } from '../../currency';

export class ExternalCryptoWalletGetDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsString()
  transactionId?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  userId?: number;

  @ApiPropertyOptional({ enum: UserTypeEnum, example: UserTypeEnum.MERCHANT_USER })
  @IsOptional()
  @IsEnum(UserTypeEnum)
  userType?: UserTypeEnum;

  @ApiPropertyOptional({ example: 13 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  currencyId?: number;

  @ApiPropertyOptional({ example: 'tb1q78679zyghzknm03rzdx5rlx2yar0zz8mvmwsxz' })
  @IsString()
  @IsOptional()
  walletAddress?: string;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isAlerted?: boolean;

  @ApiPropertyOptional({ example: 'tb1q' })
  @IsString()
  @IsOptional()
  tag?: string;
}
