import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSettlementDueDateTransactionBatchDto {
  @ApiProperty({ example: new Date() })
  @IsDateString()
  @IsNotEmpty()
  settlementDueDate: Date;

  @ApiProperty({ example: 1, description: 'Transaction batch id' })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
