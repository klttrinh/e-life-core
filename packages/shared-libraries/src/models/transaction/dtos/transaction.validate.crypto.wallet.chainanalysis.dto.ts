import { IsString, IsNumber, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BlockchainEnum, CryptoEnum } from '../../currency';

export class ValidateCryptoWalletChainAnalysisDto {
  @ApiPropertyOptional({ example: 13 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  currencyId?: number;

  @ApiProperty({ example: 'tb1q78679zyghzknm03rzdx5rlx2yar0zz8mvmwsxz' })
  @IsString()
  @IsNotEmpty()
  walletAddress: string;

  @ApiProperty({ example: CryptoEnum.BTC })
  @IsEnum(CryptoEnum)
  @IsOptional()
  currencyCode?: CryptoEnum;

  @ApiProperty({ example: BlockchainEnum.BITCOIN })
  @IsEnum(BlockchainEnum)
  @IsOptional()
  blockchain?: BlockchainEnum;

  @ApiProperty({ example: 13 })
  @Type(() => Number)
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 13 })
  @Type(() => Number)
  @IsNumber()
  assetAmount: number;

  @ApiProperty({ example: 13 })
  @Type(() => Number)
  @IsNumber()
  transactionId: number;

  @ApiPropertyOptional({ example: 13 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  cryptoWalletId?: number;
}
