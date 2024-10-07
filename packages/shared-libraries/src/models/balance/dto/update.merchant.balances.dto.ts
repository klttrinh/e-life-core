// eslint-disable-next-line max-classes-per-file
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsNumberString, ValidateNested } from 'class-validator';

class UpdateMerchantSingleBalanceDto {
  @ApiProperty({ example: 1 })
  @IsNumberString()
  merchantId: number;

  @ApiProperty({ example: 1 })
  @IsNumberString()
  currencyId: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({ example: 200 })
  @IsNumber()
  availableAmount: number;

  @ApiProperty({ example: 25 })
  @IsNumber()
  eurAmount: number;
}

export class UpdateMerchantBalancesDto {
  @IsArray() // Validates that data is an array
  @ValidateNested({ each: true }) // Validates each item in the array
  @Type(() => UpdateMerchantSingleBalanceDto) // Transforms plain objects to class instances
  data: UpdateMerchantSingleBalanceDto[];
}
