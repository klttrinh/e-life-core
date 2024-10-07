// eslint-disable-next-line max-classes-per-file
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
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

class ScanInitiateKycSummaryDto {
  @ApiPropertyOptional({ example: 'any' })
  @IsOptional()
  @IsString()
  kycProvider?: string;

  @ApiPropertyOptional({ example: '111' })
  @IsOptional()
  @IsString()
  kycId?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean;

  @ApiPropertyOptional({ example: new Date().toISOString() })
  @IsOptional()
  @IsDateString()
  emailCreationDate?: string;

  @ApiPropertyOptional({ example: new Date().toISOString() })
  @IsDateString()
  firstSeenAt?: string;
}

class ScanInitiateTransactionBreakdownDto {
  @ApiProperty({ example: new Date().toISOString() })
  @IsDateString()
  date: string;

  @ApiProperty({ example: '15.1' })
  @IsString()
  eurAmount: string;
}

class ScanInitiateTransactionSummaryDto {
  @ApiPropertyOptional({ example: '104' })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.toString())
  volume?: string;

  @ApiPropertyOptional({ example: 15 })
  @IsNumber()
  @IsOptional()
  transactionCount?: number;

  @ApiPropertyOptional({
    example: ScanInitiateTransactionBreakdownDto,
    type: ScanInitiateTransactionBreakdownDto,
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScanInitiateTransactionBreakdownDto)
  @IsOptional()
  breakdown?: ScanInitiateTransactionBreakdownDto[];
}

export class ScanInitiateMerchantParamsDto {
  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  whitelisted?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  ftd?: boolean;

  @ApiPropertyOptional({ example: ScanInitiateKycSummaryDto })
  // @ValidateNested() // TODO: uncomment when frontend issue fixed
  @IsObject()
  @IsOptional()
  @Type(() => ScanInitiateKycSummaryDto)
  kycSummary?: ScanInitiateKycSummaryDto;

  @ApiPropertyOptional({ example: ScanInitiateTransactionSummaryDto })
  @Type(() => ScanInitiateTransactionSummaryDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  @Type(() => ScanInitiateTransactionSummaryDto)
  transactionSummary?: ScanInitiateTransactionSummaryDto;
}

export class ScanInitiateMerchantDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: '100' })
  @IsString()
  external_id: string;

  @ApiProperty({ example: 34 })
  @IsNumber()
  kyc_limit?: number;

  @ApiProperty({ example: false })
  @IsBoolean()
  tpe_bypass_enabled: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  on_pd_list: boolean;
}

export class ScanInitiateCustomerDto {
  @ApiProperty({ example: 'someUsers@gmail.com' })
  @IsString()
  emailAddress: string;

  @ApiProperty({ example: '+44' })
  @IsString()
  phoneCode: string;

  @ApiProperty({ example: '9431144523' })
  @IsString()
  phoneNumber: string;

  @ApiPropertyOptional({ example: 'John' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsString()
  @IsOptional()
  lastName?: string;
}

export class ScanInitiateDto {
  @ApiPropertyOptional({ example: ScanInitiateMerchantParamsDto })
  @Type(() => ScanInitiateMerchantParamsDto)
  @ValidateNested()
  @IsObject()
  @IsOptional()
  params?: ScanInitiateMerchantParamsDto;

  @ApiPropertyOptional({ example: ScanInitiateMerchantDto })
  @Type(() => ScanInitiateMerchantDto)
  @ValidateNested()
  @IsObject()
  merchant: ScanInitiateMerchantDto;

  @ApiPropertyOptional({ example: ScanInitiateCustomerDto })
  @Type(() => ScanInitiateCustomerDto)
  @ValidateNested()
  @IsObject()
  customer: ScanInitiateCustomerDto;

  @IsString()
  amount: string;

  @IsNumber()
  @IsOptional()
  variable1?: number;
}
