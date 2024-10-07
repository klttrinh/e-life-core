import { Global, Module, DynamicModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SystemSetting } from './models/system-setting.model';
import { SystemSettingService } from './system.setting.service';
import { SystemSettingsLogsService } from './logs/system.settings.logs.service';
import { SystemSettingLog } from './logs/system.setting.log.model';

@Global()
@Module({})
export class SystemSettingModule {
  public static register(...controllers: any): DynamicModule {
    return {
      global: true,
      module: SystemSettingModule,
      imports: [SequelizeModule.forFeature([SystemSetting, SystemSettingLog])],
      controllers: [...controllers],
      providers: [SystemSettingService, SystemSettingsLogsService],
      exports: [SystemSettingService, SystemSettingsLogsService],
    };
  }
}
