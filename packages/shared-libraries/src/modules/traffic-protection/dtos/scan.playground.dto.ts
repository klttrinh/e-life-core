// eslint-disable-next-line max-classes-per-file
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ScanInitiateCustomerDto, ScanInitiateMerchantDto, ScanInitiateMerchantParamsDto } from './scan.initiate.dto';

class ScanPlayGroundPayDirectionVolumeDto {
  @ApiProperty({ example: 100 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  txCount: number;

  @ApiProperty({ example: 'any' })
  @IsString()
  userAccount: string;

  @ApiProperty({ example: new Date().toISOString() })
  @IsDateString()
  lastUsed: string;

  @ApiProperty({ example: 'EUR' })
  @IsString()
  currency: string;

  @ApiProperty({ example: 46 })
  @IsNumber()
  riskScore: number;
}

export class ScanPlayGroundPayDirectionParamsDto {
  @ApiProperty({ example: false })
  @IsBoolean()
  whitelisted: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  blacklisted: boolean;

  @ApiProperty({ example: 32 })
  @IsNumber()
  riskScore?: number;

  @ApiProperty({
    example: ScanPlayGroundPayDirectionVolumeDto,
    type: ScanPlayGroundPayDirectionVolumeDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScanPlayGroundPayDirectionVolumeDto)
  volumes: ScanPlayGroundPayDirectionVolumeDto[];
}

class ScanPlayGroundKycSummaryDto {
  @ApiProperty({ example: 'any' })
  @IsString()
  kycProvider: string;

  @ApiProperty({ example: '111' })
  @IsString()
  kycId: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  emailVerified: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  phoneVerified: boolean;

  @ApiPropertyOptional({ example: new Date().toISOString() })
  @IsDateString()
  emailCreationDate: string;

  @ApiPropertyOptional({ example: new Date().toISOString() })
  @IsOptional()
  @IsDateString()
  firstSeenAt: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  seonFraudScore?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  seonFraudBlackBoxScore?: number;

  @ApiPropertyOptional({ example: new Date().toISOString() })
  @IsOptional()
  @IsDateString()
  seonLastScanDate?: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  kountFraudOmniScore?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  kountFraudPersonaScore?: number;

  @ApiPropertyOptional({ example: new Date().toISOString() })
  @IsOptional()
  @IsDateString()
  kountLastScanDate?: string;
}

class ScanPlayGroundOnrampTransactionBreakdownDto {
  @ApiProperty({ example: new Date().toISOString() })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 'visa' })
  @IsString()
  method: string;

  @ApiProperty({ example: '12.45' })
  @IsString()
  amount: string;

  @ApiProperty({ example: '15.1' })
  @IsString()
  eurAmount: string;

  @ApiProperty({ example: 'GBP' })
  @IsString()
  currency: string;

  @ApiProperty({ example: '1111-1111-1111-1111' })
  @IsString()
  cardHash: string;

  @ApiProperty({ example: '104' })
  @IsString()
  merchantId: string;
}

class ScanPlayGroundOnRampTransactionSummaryDto {
  @ApiProperty({ example: '32.1' })
  @IsString()
  eurAmount: string;

  @ApiProperty({ example: 15 })
  @IsNumber()
  transactionCount: number;

  @ApiPropertyOptional({
    example: ScanPlayGroundOnrampTransactionBreakdownDto,
    type: ScanPlayGroundOnrampTransactionBreakdownDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScanPlayGroundOnrampTransactionBreakdownDto)
  @IsOptional()
  breakdown: ScanPlayGroundOnrampTransactionBreakdownDto[];
}

export class ScanPlayGroundOnrampParamsDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  whitelisted: boolean;

  @ApiPropertyOptional({ example: ScanPlayGroundKycSummaryDto })
  @ValidateNested()
  @IsObject()
  @Type(() => ScanPlayGroundKycSummaryDto)
  kycSummary: ScanPlayGroundKycSummaryDto;

  @ApiPropertyOptional({ example: ScanPlayGroundOnRampTransactionSummaryDto })
  @ValidateNested()
  @IsObject()
  @IsOptional()
  @Type(() => ScanPlayGroundOnRampTransactionSummaryDto)
  transactionSummary?: ScanPlayGroundOnRampTransactionSummaryDto;

  @ApiProperty({ example: 4 })
  @IsNumber()
  usCardsCount: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  euCardsCount: number;

  @ApiProperty({ example: 3 })
  @IsNumber()
  devicesCount: number;
}

class ScanPlayGroundSystemSettingDto {
  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  seonMaxScorePlatinum?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  seonMaxScoreGold?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  seonMaxScoreSilver?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  seonMaxBlackBoxScorePlatinum?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  seonMaxBlackBoxScoreGold?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  seonMaxBlackBoxScoreSilver?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  kountMaxOmniScorePlatinum?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  kountMaxOmniScoreGold?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  kountMaxOmniScoreSilver?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  kountMaxPersonaScorePlatinum?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  kountMaxPersonaScoreGold?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  kountMaxPersonaScoreSilver?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  maxInternalTransactionDuration?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  maxExternalTransactionDuration?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  maxUSCardsCount?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  maxEUCardsCount?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  maxDevicesCountPlatinum?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  maxDevicesCountGold?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  maxDevicesCountSilver?: number;
}

export class ScanPlaygroundDto {
  @ValidateNested()
  @ApiPropertyOptional({ example: ScanInitiateCustomerDto })
  @IsOptional()
  @IsObject()
  @Type(() => ScanInitiateCustomerDto)
  customerParams?: ScanInitiateCustomerDto;

  @ApiPropertyOptional({ example: ScanInitiateMerchantParamsDto })
  @ValidateNested()
  @IsObject()
  @IsOptional()
  @Type(() => ScanInitiateMerchantParamsDto)
  merchantParams?: ScanInitiateMerchantParamsDto;

  @ValidateNested()
  @ApiPropertyOptional({ example: ScanInitiateMerchantDto })
  @IsOptional()
  @IsObject()
  @Type(() => ScanInitiateMerchantDto)
  merchantData?: ScanInitiateMerchantDto;

  @ApiPropertyOptional({ example: ScanPlayGroundOnrampParamsDto })
  @ValidateNested()
  @IsObject()
  @IsOptional()
  @Type(() => ScanPlayGroundOnrampParamsDto)
  onRampParams?: ScanPlayGroundOnrampParamsDto;

  @ApiPropertyOptional({ example: ScanPlayGroundPayDirectionParamsDto })
  @ValidateNested()
  @IsObject()
  @IsOptional()
  @Type(() => ScanPlayGroundPayDirectionParamsDto)
  payDirectionParams?: ScanPlayGroundPayDirectionParamsDto;

  @ApiPropertyOptional({ example: ScanPlayGroundSystemSettingDto })
  @ValidateNested()
  @IsObject()
  @IsOptional()
  @Type(() => ScanPlayGroundSystemSettingDto)
  systemSettings?: ScanPlayGroundSystemSettingDto;

  @ApiPropertyOptional({ example: '42.01' })
  @IsOptional()
  @IsString()
  amount?: string;
}
