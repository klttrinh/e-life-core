import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class InitiatePayoutDto {
  @ApiProperty({ example: '' }) // TODO: add api example for batch numbers
  @IsString()
  @IsNotEmpty()
  batchNumbers: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsOptional()
  fee?: number;

  @ApiProperty({ example: 'some description' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
