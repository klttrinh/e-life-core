import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetBatchesDto } from './get.batches.dto';
import { ExportTypeEnum } from '../../../models/export/export-type.enum';

export class ExportBatchesDto extends GetBatchesDto {
  @ApiProperty({ example: ExportTypeEnum.CSV })
  @IsEnum(ExportTypeEnum)
  exportType: ExportTypeEnum;
}
