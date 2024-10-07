import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ServicesEnum } from '../../../general/enums/service.type.enum';
import { InitiatorTypeEnum } from '../../../models/transaction/enums/initiator-type.enum';
import { SystemSettingsEnum } from '../enums/system.settings.enum';
import { SystemSettingsLogEventEnum } from './system.settings.log.event.enum';

@Table({
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'system_settings_logs',
})
// eslint-disable-next-line no-use-before-define
export class SystemSettingLog extends Model<SystemSettingLog> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  id: number;

  @Column(DataType.ENUM({ values: Object.values(SystemSettingsLogEventEnum) }))
  event: SystemSettingsLogEventEnum;

  @Column(DataType.ENUM({ values: Object.values(SystemSettingsEnum) }))
  setting_key: SystemSettingsEnum;

  @Column(DataType.TEXT)
  description?: string;

  @Column(DataType.BIGINT)
  initiator_id?: number;

  @Column(DataType.ENUM({ values: Object.values(InitiatorTypeEnum) }))
  initiator_type?: InitiatorTypeEnum;

  @Column(DataType.STRING)
  initiator_name: string;

  @Column(DataType.TEXT)
  stack_trace?: string;

  @Column(DataType.JSON)
  extra_data?: object;

  @Column(DataType.DATE)
  created_at: Date;

  @Column(DataType.DATE)
  updated_at: Date;
}
