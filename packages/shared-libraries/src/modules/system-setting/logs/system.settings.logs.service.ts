import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attributes, WhereOptions } from 'sequelize';
import { BaseLogService } from '../../../models/logs/base.log.service';
import { SystemSetting } from '../models/system-setting.model';
import { AppLogger } from '../../../logs/app.logger';
import { SystemSettingLog } from './system.setting.log.model';
import { UserBaseInfo } from '../../../helpers/user-base-info/user.base.info';
import { SystemSettingsLogEventEnum } from './system.settings.log.event.enum';
import { SystemSettingsEnum } from '../enums/system.settings.enum';
import { PaginationQueryDto } from '../../../models';
import { paginate } from '../../../utils/db.utils';
import { SystemSettingValueTypeEnum } from '../enums/system.setting.value.type.enum';

@Injectable()
export class SystemSettingsLogsService extends BaseLogService<SystemSetting> {
  private readonly logger = new AppLogger(SystemSettingsLogsService.name);

  public static idsOverriders: ((setting: SystemSetting) => Promise<void>)[] = [];

  constructor(
    @InjectModel(SystemSettingLog)
    private settingsLogModel: typeof SystemSettingLog,
  ) {
    super();
  }

  public async created(data: {
    setting: SystemSetting;
    initiator: Omit<UserBaseInfo, 'name'> & { name?: string };
  }): Promise<SystemSettingLog> {
    return this.settingsLogModel.create({
      ...(await this.generate()),
      event: SystemSettingsLogEventEnum.CREATED,
      extra_data: data.setting,
      setting_key: data.setting.key,
      initiator_id: data.initiator.id,
      initiator_type: data.initiator.type,
      initiator_name: data.initiator.name,
    });
  }

  public async deleted(data: {
    settingKey: SystemSettingsEnum;
    initiator?: Omit<UserBaseInfo, 'name'> & { name?: string };
  }): Promise<SystemSettingLog> {
    return this.settingsLogModel.create({
      ...(await this.generate()),
      event: SystemSettingsLogEventEnum.DELETED,
      setting_key: data.settingKey,
      initiator_id: data.initiator?.id,
      initiator_type: data.initiator?.type,
      initiator_name: data.initiator?.name,
    });
  }

  public beginManualUpdate(data: {
    initiator: Omit<UserBaseInfo, 'name'> & { name?: string };
    dto: object;
    setting: Attributes<SystemSetting>;
  }): { end: () => Promise<void> } {
    const previous = data.setting.get({ plain: true, clone: true });
    return {
      end: async () => {
        const updated = data.setting.get({ plain: true });

        if (
          previous.type === SystemSettingValueTypeEnum.Object ||
          previous.type === SystemSettingValueTypeEnum.IntegerArray ||
          previous.type === SystemSettingValueTypeEnum.StringArray ||
          previous.type === SystemSettingValueTypeEnum.EnumArray
        ) {
          previous.value = JSON.parse(previous.value);
          updated.value = JSON.parse(updated.value);
        }

        for (const overrider of SystemSettingsLogsService.idsOverriders) {
          await overrider(previous);
          await overrider(updated);
        }

        const differences = BaseLogService.extractChangedAttributes(previous, updated);

        if (!differences) {
          return;
        }

        await this.settingsLogModel.create({
          ...(await this.generate()),
          event: SystemSettingsLogEventEnum.UPDATED_MANUALLY,
          setting_key: data.setting.key,
          initiator_id: data.initiator.id,
          initiator_type: data.initiator.type,
          initiator_name: data.initiator.name,
          extra_data: {
            ...differences,
            dto: data.dto,
          },
        });
      },
    };
  }

  async findOne(filter: WhereOptions<SystemSettingLog>): Promise<SystemSettingLog> {
    return this.settingsLogModel.findOne({ where: filter });
  }

  async query({
    _start,
    _end,
    _sort,
    _order,
  }: PaginationQueryDto): Promise<{ rows: SystemSettingLog[]; count: number }> {
    return paginate(this.settingsLogModel, _start, _end, {
      order: _order,
      sort: _sort,
      where: {},
      attributes: { exclude: ['stack_trace'] },
      raw: true,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private async generate(): Promise<any> {
    let stackTrace: string;
    try {
      throw new Error();
    } catch (e) {
      stackTrace = String(e.stack).slice(100);
    }
    return {
      stack_trace: stackTrace,
    };
  }
}
