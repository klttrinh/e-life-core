import { IsString, IsOptional, IsEnum, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserTypeEnum } from '../enums/user.type.enum';

export class CreateCryptoWalletDto {
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
  @IsNumber()
  currencyId?: number;

  @ApiProperty({ example: 'tb1q78679zyghzknm03rzdx5rlx2yar0zz8mvmwsxz' })
  @IsString()
  @IsNotEmpty()
  walletAddress: string;

  @ApiPropertyOptional({ example: 'tb1q' })
  @IsString()
  @IsOptional()
  tag?: string;

  @ApiPropertyOptional({ example: '1' })
  @IsString()
  @IsOptional()
  merchantId?: string;
}
