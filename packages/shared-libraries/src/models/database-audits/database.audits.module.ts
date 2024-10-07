import { DynamicModule, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseAuditsService } from './database.audits.service';
import { DatabaseAudit } from './models/database.audit.model';

@Module({})
export class DatabaseAuditsModule {
  public static register({ controllers = [], modules = [] }: { controllers?: any[]; modules?: any[] }): DynamicModule {
    return {
      global: true,
      module: DatabaseAuditsModule,
      imports: [SequelizeModule.forFeature([DatabaseAudit]), ...modules],
      controllers: [...controllers],
      providers: [DatabaseAuditsService],
      exports: [DatabaseAuditsService],
    };
  }
}
