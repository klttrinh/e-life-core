import { IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Setting } from './setting';
import { UserBaseInfo } from '../../../helpers';

export class UpdateSystemSettingsDto {
  @Type(() => Setting)
  @ValidateNested()
  setting: Setting;

  @IsObject()
  initiator: Omit<UserBaseInfo, 'name'> & { name?: string };
}
