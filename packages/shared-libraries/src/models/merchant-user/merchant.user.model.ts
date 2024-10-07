import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ timestamps: true, underscored: true })
export class MerchantUser extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column(DataType.STRING)
  external_id: string;

  @Column(DataType.BIGINT)
  merchant_id: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.DATE)
  dob: string;

  @Column(DataType.STRING)
  country: string;

  @Column(DataType.BOOLEAN)
  internal_user: boolean;
}
