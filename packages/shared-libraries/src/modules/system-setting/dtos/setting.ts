import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';
import { SystemSettingsEnum } from '../enums/system.settings.enum';

export class Setting {
  @ApiProperty({ enum: SystemSettingsEnum, example: SystemSettingsEnum.STORAGE_SIZE })
  @IsNotEmpty()
  @IsEnum(SystemSettingsEnum)
  key: SystemSettingsEnum;

  @ApiProperty({ example: JSON.stringify({ size: '10MB' }) })
  @IsDefined()
  value: string;
}
