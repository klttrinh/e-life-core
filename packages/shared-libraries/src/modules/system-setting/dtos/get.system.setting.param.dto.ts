import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SystemSettingsEnum } from '../enums/system.settings.enum';

export class GetSystemSettingParamDto {
  @ApiProperty({ enum: SystemSettingsEnum, example: SystemSettingsEnum.STORAGE_SIZE })
  @IsNotEmpty()
  @IsEnum(SystemSettingsEnum)
  key: SystemSettingsEnum;
}
