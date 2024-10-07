import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StringIdParamDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsString()
  id: string;
}
