import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TransactionFilterByDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  filterBy: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  value: string;
}
