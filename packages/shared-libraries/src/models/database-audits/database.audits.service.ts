import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import moment from 'moment';
import { DatabaseAudit } from './models/database.audit.model';
import { BaseRepository } from '../../general/base.repository';
import { DatabaseAuditExportDto } from './dtos/database.audit.export.dto';

@Injectable()
export class DatabaseAuditsService extends BaseRepository<DatabaseAudit> {
  constructor(
    @InjectModel(DatabaseAudit)
    private readonly repo: typeof DatabaseAudit,
  ) {
    super(repo);
  }

  public async generateExportableData({
    action,
    endDate,
    entryId,
    startDate,
    tableName,
    service,
    ...rest
  }: DatabaseAuditExportDto) {
    const where: any = {};

    if (startDate) {
      where.created_at = { [Op.gte]: startDate };
    }

    if (endDate) {
      where.created_at = { [Op.lte]: startDate };
    }

    if (action) {
      where.action = action;
    }

    if (entryId) {
      where.entry_id = entryId;
    }

    if (tableName) {
      where.table_name = tableName;
    }

    // eslint-disable-next-line no-underscore-dangle
    rest._end = rest._end || 20000;

    const { rows } = await this.query(rest, {
      where,
    });

    if (!rows.length) throw new Error('No matching record was found');

    return rows;
  }

  public getExpirationDate() {
    return moment().add(-2, 'months');
  }

  public getFilePrefix() {
    return 'db_audits';
  }

  public async cleanUp() {
    return this.delete({ where: { created_at: { [Op.lte]: this.getExpirationDate().toDate() } } });
  }
}
