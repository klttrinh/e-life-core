import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { SystemSettingValueTypeEnum } from '../enums/system.setting.value.type.enum';

@Table({
  timestamps: true,
  underscored: true,
  tableName: 'system_settings',
  indexes: [
    {
      name: 'UNIQUE_CONSTRAINT_KEY',
      unique: true,
      fields: ['key'],
    },
  ],
})
// eslint-disable-next-line no-use-before-define
export class SystemSetting extends Model<SystemSetting> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  key: string;

  @Column(DataType.TEXT)
  value: string;

  @Column(DataType.STRING)
  type: SystemSettingValueTypeEnum;

  @Column(DataType.BOOLEAN)
  editable: boolean;

  @Column(DataType.BOOLEAN)
  visible: boolean;

  @Column(DataType.ARRAY(DataType.STRING))
  enum: string[];
}
