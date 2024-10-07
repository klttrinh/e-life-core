import { AutoIncrement, Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { DatabaseNotificationTypesEnum } from '../enums/database.notification.types.enum';

@Table({
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'database_audits',
})
// eslint-disable-next-line no-use-before-define
export class DatabaseAudit extends Model<DatabaseAudit> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  id: number;

  @Column(DataType.STRING)
  table_name: string;

  @Column(DataType.ENUM({ values: Object.values(DatabaseNotificationTypesEnum) }))
  action: DatabaseNotificationTypesEnum;

  @Column(DataType.BIGINT)
  entry_id: number;

  @Column(DataType.JSONB)
  old_value: any;

  @Column(DataType.JSONB)
  new_value: any;

  @Column(DataType.DATE)
  created_at: Date;
}
